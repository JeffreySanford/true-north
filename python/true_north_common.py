#!/usr/bin/env python
"""
true_north_common.py - Shared utilities and constants for True North Python tools
Contains core styling, helper functions, and common utilities used across
the suite of True North document generation tools.
"""

import re
import sys
import matplotlib.pyplot as plt
from pathlib import Path

# ---------- TNI Colors and Styling --------------------------------------
TNI_COLORS = {
    'navy': '#002868',      # Dark blue - primary
    'red': '#BF0A30',       # Bright red - accent
    'light_blue': '#0A3161', # Medium blue
    'gold': '#FFD700',      # Gold for military accents
    'white': '#FFFFFF',     # White
    'light_gray': '#F5F5F5', # Light gray
    'dark_gray': '#333333',  # Dark gray
    'army_green': '#4B5320', # Army green for veteran emphasis
    'nd_blue': '#004C8C'     # North Dakota blue
}

# ---------- Global helper functions -------------------------------------
def ascii_only(text: str) -> str:
    """Convert text to ASCII-only by replacing special characters"""
    subs = {
        "\u2013": "-",   # en dash
        "\u2014": "-",   # em dash
        "\u00A0": " ",   # NBSP
        "\u202F": " ",   # narrow NBSP
        "\u00D7": "x"    # multiplication sign
    }
    for k, v in subs.items():
        text = text.replace(k, v)
    return re.sub(r" {2,}", " ", text)

def setup_matplotlib_style():
    """Configure matplotlib styling for True North charts"""
    plt.rcParams['font.family'] = 'sans-serif'
    plt.rcParams['font.sans-serif'] = ['Arial', 'DejaVu Sans']
    plt.style.use('seaborn-v0_8-whitegrid')
    plt.rcParams['axes.labelcolor'] = TNI_COLORS['dark_gray']
    plt.rcParams['axes.titlecolor'] = TNI_COLORS['navy']
    plt.rcParams['figure.titleweight'] = 'bold'
    
def save_chart(output_path, plot_fn):
    """Create and save a chart using the provided plotting function"""
    plot_fn()
    plt.tight_layout()
    plt.savefig(output_path, dpi=200)
    plt.close()
    print(f"[OK] Chart created at {output_path}")

def create_directory(path, quiet=False):
    """Create directory if it doesn't exist and return Path object"""
    path_obj = Path(path)
    path_obj.mkdir(exist_ok=True, parents=True)
    if not quiet:
        print(f"[INFO] Directory ready: {path_obj}")
    return path_obj

def print_header(message, char="=", width=80):
    """Print a formatted header with the specified message"""
    print("\n" + char * width)
    print(f"{message}")
    print(char * width)

def print_success(message):
    """Print a success message with formatting"""
    print(f"✅  {message}")

def print_error(message):
    """Print an error message with formatting"""
    print(f"❌  {message}")

def check_dependency(command, name, install_instructions):
    """Check if a dependency is installed and print instructions if not"""
    from shutil import which
    if not which(command):
        print_error(f"{name} not found!")
        print(f"[HELP] Please install {name}: {install_instructions}")
        return False
    return True

def draw_matplotlib_star(x, y, size, color):
    """Draw a 5-pointed star using matplotlib"""
    import numpy as np
    points = []
    for i in range(10):
        angle_deg = 36 * i - 90
        angle_rad = np.pi / 180 * angle_deg
        r = size if i % 2 == 0 else size/2.5
        points.append((x + r * np.cos(angle_rad), y + r * np.sin(angle_rad)))
    x_points, y_points = zip(*points)
    plt.fill(x_points, y_points, color=color)
    return plt
