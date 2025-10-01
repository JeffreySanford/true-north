"""
visualizations.py - Shared visualization module for True North Insights
Provides common chart functions with consistent patriotic styling and military precision
"""

import matplotlib.pyplot as plt
import numpy as np
import matplotlib as mpl
import pandas as pd
import matplotlib.dates as mdates
from datetime import datetime, timedelta
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import os

# ---------- True North color palette ---------------------------------------
TNI_COLORS = {
    'navy': '#002868',      # Dark blue - primary
    'red': '#BF0A30',       # Bright red - accent
    'light_blue': '#0A3161', # Medium blue
    'gold': '#FFD700',      # Gold for military accents
    'white': '#FFFFFF',     # White
    'light_gray': '#F5F5F5', # Light gray
    'dark_gray': '#333333'   # Dark gray
}

# Apply styling to all matplotlib plots
def apply_tni_style():
    """Apply True North style to matplotlib plots"""
    plt.rcParams['font.family'] = 'sans-serif'
    plt.rcParams['font.sans-serif'] = ['Arial', 'DejaVu Sans']
    plt.style.use('seaborn-v0_8-whitegrid')
    plt.rcParams['axes.labelcolor'] = TNI_COLORS['dark_gray']
    plt.rcParams['axes.titlecolor'] = TNI_COLORS['navy']
    plt.rcParams['figure.titleweight'] = 'bold'

# Create custom color maps
tni_cmap = mpl.colors.LinearSegmentedColormap.from_list("tni", 
                                                     [TNI_COLORS['navy'], 
                                                      TNI_COLORS['light_blue'], 
                                                      TNI_COLORS['red']])

# ---------- Drawing helpers ------------------------------------------------
def draw_star(draw, x, y, size, color, outline=None):
    """Draw a 5-pointed star with PIL"""
    points = []
    for i in range(10):
        # Alternate between outer and inner circle points
        angle_deg = 36 * i - 90  # Start at the top
        angle_rad = np.pi / 180 * angle_deg
        r = size if i % 2 == 0 else size / 2.5
        points.append((x + r * np.cos(angle_rad), y + r * np.sin(angle_rad)))
    draw.polygon(points, fill=color, outline=outline)

def draw_matplotlib_star(x, y, size, color):
    """Draw a star using matplotlib"""
    points = []
    for i in range(10):
        angle_deg = 36 * i - 90
        angle_rad = np.pi / 180 * angle_deg
        r = size if i % 2 == 0 else size/2.5
        points.append((x + r * np.cos(angle_rad), y + r * np.sin(angle_rad)))
    x_points, y_points = zip(*points)
    plt.fill(x_points, y_points, color=color)
    return plt

# ---------- Banner and branding --------------------------------------------
def create_banner(output_path, width=1200, height=200):
    """Creates a patriotic banner with True North Insights logo"""
    img = Image.new('RGB', (width, height), color=TNI_COLORS['white'])
    draw = ImageDraw.Draw(img)
    
    # Create red and blue gradient backdrop
    for x in range(width):
        # Create a gradient from red to white to blue
        if x < width/2:
            # Red to white gradient
            r = int(TNI_COLORS['red'][1:3], 16) + int((255 - int(TNI_COLORS['red'][1:3], 16)) * (x / (width/2)))
            g = int(TNI_COLORS['red'][3:5], 16) + int((255 - int(TNI_COLORS['red'][3:5], 16)) * (x / (width/2)))
            b = int(TNI_COLORS['red'][5:7], 16) + int((255 - int(TNI_COLORS['red'][5:7], 16)) * (x / (width/2)))
        else:
            # White to blue gradient
            factor = (x - width/2) / (width/2)
            r = 255 - int((255 - int(TNI_COLORS['navy'][1:3], 16)) * factor)
            g = 255 - int((255 - int(TNI_COLORS['navy'][3:5], 16)) * factor)
            b = 255 - int((255 - int(TNI_COLORS['navy'][5:7], 16)) * factor)
        
        color = f"#{r:02x}{g:02x}{b:02x}"
        draw.line([(x, 0), (x, height)], fill=color)
    
    # Add company name - More robust font handling
    try:
        font = ImageFont.truetype("Arial Bold", 48)
    except (OSError, IOError):
        font = ImageFont.load_default()
    
    draw.text((width//2, height//2-10), "TRUE NORTH INSIGHTS", 
              fill=TNI_COLORS['white'], font=font, anchor="mm", stroke_width=2, stroke_fill=TNI_COLORS['dark_gray'])
    
    try:
        small_font = ImageFont.truetype("Arial", 24)
    except (OSError, IOError):
        small_font = ImageFont.load_default()
        
    draw.text((width//2, height//2+40), "VETERAN-LED TECHNOLOGY SOLUTIONS", 
              fill=TNI_COLORS['gold'], font=small_font, anchor="mm")
    
    # Add shield emblem
    shield_width, shield_height = 80, 100
    left_margin = 50
    shield_coords = [(left_margin, height//2-shield_height//2), 
                    (left_margin+shield_width//2, height//2-shield_height//2),
                    (left_margin+shield_width, height//2-shield_height//2),
                    (left_margin+shield_width, height//2+shield_height//2),
                    (left_margin+shield_width//2, height//2+shield_height//2+20),
                    (left_margin, height//2+shield_height//2)]
    draw.polygon(shield_coords, fill=TNI_COLORS['navy'], outline=TNI_COLORS['gold'])
    
    # Add stars
    right_margin = 50
    for i in range(3):
        star_x = width - right_margin - i*30
        star_y = height//2
        draw_star(draw, star_x, star_y, 10, TNI_COLORS['gold'], TNI_COLORS['navy'])
    
    # Save the banner
    img.save(output_path)
    print(f"✓  banner saved at {output_path}")

# ---------- Standard charts ------------------------------------------------
def create_competencies_pie(competencies, output_path=None):
    """Creates a pie chart of core competencies"""
    plt.figure(figsize=(7, 6))
    
    labels = list(competencies.keys())
    sizes = list(competencies.values())
    
    # Use patriotic colors for the pie slices
    colors = [TNI_COLORS['navy'], TNI_COLORS['red'], TNI_COLORS['light_blue'], 
              TNI_COLORS['gold'], TNI_COLORS['red'], TNI_COLORS['navy'], 
              TNI_COLORS['light_blue']]
    
    plt.pie(sizes, labels=None, colors=colors, autopct='%1.1f%%', 
           startangle=90, wedgeprops=dict(width=0.5, edgecolor='white'))
    
    # Add a title
    plt.title('True North Core Competencies', 
             fontsize=16, color=TNI_COLORS['navy'], fontweight='bold', pad=20)
    
    # Add a legend
    plt.legend(labels, loc="center", bbox_to_anchor=(0.5, 0.5),
              fontsize=10)
    
    plt.tight_layout()
    
    if output_path:
        plt.savefig(output_path, dpi=200)
        plt.close()
        print(f"✓  competencies pie chart saved at {output_path}")
    
    return plt

def create_roadmap_gantt(roadmap_data, output_path=None):
    """Creates a Gantt chart for a project roadmap
    
    Parameters:
    roadmap_data: List of dicts with 'PI' (task name), 'Start' and 'End' dates
    output_path: Optional path to save the chart
    """
    df_rm = pd.DataFrame(roadmap_data)
    df_rm['Start'] = pd.to_datetime(df_rm['Start'])
    df_rm['End'] = pd.to_datetime(df_rm['End'])
    df_rm['StartNum'] = mdates.date2num(df_rm['Start'])
    df_rm['EndNum'] = mdates.date2num(df_rm['End'])
    df_rm['Duration'] = df_rm['EndNum'] - df_rm['StartNum']

    fig, ax = plt.subplots(figsize=(10, 5))
    
    # Create horizontal bars for each PI
    bars = ax.barh(df_rm['PI'], df_rm['Duration'], left=df_rm['StartNum'],
                  color=[TNI_COLORS['navy'], TNI_COLORS['light_blue'], 
                         TNI_COLORS['red'], TNI_COLORS['navy'], TNI_COLORS['light_blue']])
    
    # Add milestone markers
    for i, bar in enumerate(bars):
        milestone_date = df_rm['End'].iloc[i]
        milestone_x = mdates.date2num(milestone_date)
        ax.scatter(milestone_x, i, marker='*', s=150, color=TNI_COLORS['gold'], 
                  zorder=10, edgecolor='white')
    
    # Format the x-axis as dates
    ax.set_xlabel('Timeline', fontsize=12, fontweight='bold')
    ax.set_title('Strategic Roadmap Timeline', fontsize=16, 
                color=TNI_COLORS['navy'], fontweight='bold')
    
    # Configure date formatting
    locator = mdates.YearLocator()
    formatter = mdates.DateFormatter('%Y')
    ax.xaxis.set_major_locator(locator)
    ax.xaxis.set_major_formatter(formatter)
    
    # Add grid lines
    ax.grid(axis='x', alpha=0.3)
    
    # Add borders to the chart
    for spine in ax.spines.values():
        spine.set_edgecolor(TNI_COLORS['navy'])
        spine.set_linewidth(1.5)
    
    plt.tight_layout()
    
    if output_path:
        plt.savefig(output_path, dpi=200)
        plt.close()
        print(f"✓  roadmap Gantt chart saved at {output_path}")
    
    return plt

def create_bar_comparison(categories, data_sets, labels, title, 
                         y_label, output_path=None, percentage_labels=True):
    """Creates a bar chart comparing multiple data sets
    
    Parameters:
    categories: List of category names
    data_sets: List of lists containing the values for each data set
    labels: List of labels for each data set
    title: Chart title
    y_label: Label for Y-axis
    output_path: Optional path to save the chart
    percentage_labels: Whether to add percentage improvement labels
    """
    fig, ax = plt.subplots(figsize=(10, 6))
    
    # Set width of bars
    barWidth = 0.35
    positions = [np.arange(len(categories))]
    for i in range(1, len(data_sets)):
        positions.append([x + barWidth for x in positions[i-1]])
    
    # Create bars
    bars = []
    colors = [TNI_COLORS['red'], TNI_COLORS['navy'], TNI_COLORS['light_blue']]
    
    for i, data_set in enumerate(data_sets):
        bars.append(ax.bar(positions[i], data_set, width=barWidth, color=colors[i % len(colors)], 
                          edgecolor='white', alpha=0.8, label=labels[i]))
    
    # Add labels and title
    ax.set_title(title, fontsize=16, fontweight='bold', color=TNI_COLORS['navy'])
    ax.set_xlabel('Metrics', fontsize=12)
    ax.set_ylabel(y_label, fontsize=12)
    ax.set_xticks([p + barWidth/2 for p in positions[0]])
    ax.set_xticklabels(categories)
    
    # Create legend and grid
    ax.legend(loc='upper right')
    ax.grid(axis='y', linestyle='--', alpha=0.7)
    
    # Add improvement percentages if requested
    if percentage_labels and len(data_sets) >= 2:
        for i in range(len(categories)):
            # Calculate improvement percentage
            improvement = ((data_sets[0][i] - data_sets[1][i]) / data_sets[0][i]) * 100
            ax.text(positions[0][i] + barWidth/2, max(data_sets[0][i], data_sets[1][i]) + 5, 
                   f"{improvement:.0f}% better", ha='center', fontsize=10, 
                   color=TNI_COLORS['navy'], fontweight='bold')
    
    plt.tight_layout()
    
    if output_path:
        plt.savefig(output_path, dpi=200)
        plt.close()
        print(f"✓  bar comparison chart saved at {output_path}")
    
    return plt

def create_timeline_gantt(tasks, output_path=None):
    """Creates a detailed Gantt chart for project timelines
    
    Parameters:
    tasks: List of dicts with 'Task', 'Start', and 'End' dates
    output_path: Optional path to save the chart
    """
    df_tasks = pd.DataFrame(tasks)
    df_tasks['Start'] = pd.to_datetime(df_tasks['Start'])
    df_tasks['End'] = pd.to_datetime(df_tasks['End'])
    df_tasks['StartNum'] = mdates.date2num(df_tasks['Start'])
    df_tasks['EndNum'] = mdates.date2num(df_tasks['End'])
    df_tasks['Duration'] = df_tasks['EndNum'] - df_tasks['StartNum']
    
    # Create the figure
    fig, ax = plt.subplots(figsize=(10, 4))
    
    # Plot the Gantt bars
    colors = [TNI_COLORS['navy'], TNI_COLORS['light_blue'], 
              TNI_COLORS['red'], TNI_COLORS['light_blue'], TNI_COLORS['navy']]
    
    for i, task in df_tasks.iterrows():
        ax.barh(task['Task'], task['Duration'], left=task['StartNum'],
               color=colors[i % len(colors)], height=0.5,
               edgecolor='white', linewidth=1)
    
    # Format the x-axis as dates
    ax.set_xlabel('Timeline', fontsize=12, fontweight='bold')
    ax.set_title('Project Implementation Timeline', 
                fontsize=16, color=TNI_COLORS['navy'], fontweight='bold')
    
    # Configure date formatting
    locator = mdates.MonthLocator()
    formatter = mdates.DateFormatter('%b %Y')
    ax.xaxis.set_major_locator(locator)
    ax.xaxis.set_major_formatter(formatter)
    
    # Add borders to the chart
    for spine in ax.spines.values():
        spine.set_edgecolor(TNI_COLORS['navy'])
        spine.set_linewidth(1.5)
    
    # Add grid lines
    ax.grid(axis='x', alpha=0.3)
    
    # Adjust y-axis
    ax.invert_yaxis()  # Invert so tasks start from top
    
    plt.tight_layout()
    
    if output_path:
        plt.savefig(output_path, dpi=200)
        plt.close()
        print(f"✓  timeline Gantt chart saved at {output_path}")
    
    return plt

def create_metric_line_chart(years, metrics, title, y_label, 
                            annotations=None, output_path=None):
    """Creates a line chart for tracking metrics over time
    
    Parameters:
    years: List of years or time points
    metrics: List of metric values
    title: Chart title
    y_label: Label for Y-axis
    annotations: Optional list of (x,y,text) tuples for annotations
    output_path: Optional path to save the chart
    """
    plt.figure(figsize=(7, 4))
    
    plt.plot(years, metrics, marker='o', markersize=10, color=TNI_COLORS['red'], 
             linewidth=3)
    plt.fill_between(years, metrics, alpha=0.2, color=TNI_COLORS['red'])
    
    plt.title(title, fontsize=16, color=TNI_COLORS['navy'], fontweight='bold')
    plt.xlabel("Fiscal Year", fontsize=12)
    plt.ylabel(y_label, fontsize=12)
    plt.grid(alpha=0.3)
    
    # Add data labels
    for x, y in zip(years, metrics):
        plt.text(x, y+0.5, str(y), ha='center', fontweight='bold', 
                color=TNI_COLORS['navy'])
    
    # Add annotations if provided
    if annotations:
        for x, y, text in annotations:
            plt.annotate(text, xy=(x, y), xytext=(x+0.2, y+5),
                        arrowprops=dict(facecolor=TNI_COLORS['navy'], shrink=0.05),
                        fontsize=10, color=TNI_COLORS['navy'], ha='center')
    
    plt.tight_layout()
    
    if output_path:
        plt.savefig(output_path, dpi=200)
        plt.close()
        print(f"✓  metric line chart saved at {output_path}")
    
    return plt

def create_process_diagram(steps, output_path=None):
    """Creates a circular process diagram
    
    Parameters:
    steps: List of step names
    output_path: Optional path to save the diagram
    """
    plt.figure(figsize=(10, 6))
    plt.axis('off')
    
    # Setup
    colors = []
    for i in range(len(steps)):
        if i % 2 == 0:
            colors.append(TNI_COLORS['navy'])
        else:
            colors.append(TNI_COLORS['light_blue'])
    
    # Use red for authorization step if it exists
    if 'AUTHORIZE' in steps:
        authorize_index = steps.index('AUTHORIZE')
        colors[authorize_index] = TNI_COLORS['red']
    
    # Draw circular process with arrows
    radius = 2.5
    center_x, center_y = 5, 3
    for i, (step, color) in enumerate(zip(steps, colors)):
        angle = 2 * np.pi * i / len(steps)
        x = center_x + radius * np.cos(angle)
        y = center_y + radius * np.sin(angle)
        
        # Draw node
        circle = plt.Circle((x, y), 0.5, color=color, alpha=0.8)
        plt.gca().add_patch(circle)
        
        # Add step label
        plt.text(x, y, f"{i+1}", color='white', ha='center', va='center', fontweight='bold', fontsize=14)
        plt.text(x, y-0.7, step, color=color, ha='center', va='center', fontweight='bold', fontsize=10)
        
        # Draw arrow to next step
        if i < len(steps) - 1:
            next_angle = 2 * np.pi * (i + 1) / len(steps)
            next_x = center_x + radius * np.cos(next_angle)
            next_y = center_y + radius * np.sin(next_angle)
            
            # Calculate arrow points
            arrow_len = 0.4
            dx, dy = next_x - x, next_y - y
            dist = np.sqrt(dx**2 + dy**2)
            dx, dy = dx/dist, dy/dist
            
            plt.arrow(x + 0.5*dx, y + 0.5*dy, 
                     dx * (dist - 1.0), dy * (dist - 1.0),
                     head_width=0.15, head_length=0.2, fc=TNI_COLORS['gold'], ec=TNI_COLORS['gold'])
    
    # Add continuous monitoring arrow back to step 1 - removed 'curve' parameter
    plt.arrow(center_x + radius * np.cos(2*np.pi*(len(steps)-1)/len(steps)) + 0.5*np.cos(2*np.pi*(len(steps)-1)/len(steps)), 
             center_y + radius * np.sin(2*np.pi*(len(steps)-1)/len(steps)) + 0.5*np.sin(2*np.pi*(len(steps)-1)/len(steps)),
             radius * 1.5 * np.cos(np.pi), radius * 1.5 * np.sin(np.pi),
             head_width=0.15, head_length=0.2, fc=TNI_COLORS['gold'], ec=TNI_COLORS['gold'],
             linestyle='dashed')
    
    # Add True North branding
    plt.text(center_x, center_y-0.3, "TRUE NORTH INSIGHTS", ha='center', fontsize=16, 
            color=TNI_COLORS['navy'], fontweight='bold')
    plt.text(center_x, center_y, "PROCESS DIAGRAM", ha='center', fontsize=14,
            color=TNI_COLORS['red'])
    
    if output_path:
        plt.savefig(output_path, dpi=150, bbox_inches='tight')
        plt.close()
        print(f"✓  process diagram created at {output_path}")
    
    return plt

# ---------- Helper functions ----------------------------------------------
def save_chart(func, name, *args, **kwargs):
    """Save a chart using the given function and name"""
    func(*args, **kwargs)
    plt.tight_layout()
    plt.savefig(name, dpi=200)
    plt.close()
    print(f"✓  chart saved: {name}")

# Initialize the TNI style when module is imported
apply_tni_style()
