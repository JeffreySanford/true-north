#!/usr/bin/env python
"""
business_plan.py – builds charts/ + business_plan.md with vibrant patriotic styling
Creates comprehensive visualization suite with American-themed color palette
and informative infographics for True North's mission-critical documents.
"""

from pathlib import Path
import matplotlib.pyplot as plt
import matplotlib as mpl
import numpy as np
from textwrap import dedent
from PIL import Image, ImageDraw, ImageFont
import pandas as pd
import matplotlib.dates as mdates
from datetime import datetime
from true_north_common import (
    TNI_COLORS, ascii_only, create_directory, print_header,
    print_success, setup_matplotlib_style, draw_matplotlib_star
)

# Configure matplotlib styling
setup_matplotlib_style()

# Create custom color maps for charts
tni_cmap = mpl.colors.LinearSegmentedColormap.from_list("tni", 
                                                      [TNI_COLORS['navy'], 
                                                       TNI_COLORS['light_blue'], 
                                                       TNI_COLORS['red']])

def save_chart(name, plot_fn):
    """Save a chart to the charts directory"""
    plot_fn()
    plt.tight_layout()
    path = CHARTS_DIR / f"{name}.png"
    plt.savefig(path, dpi=200)
    plt.close()
    print(f"✓  chart saved  {path}")

def section(title, body_md):
    """Create a markdown section with problem/solution/benefit header"""
    p, s, b = PSB[title]
    summary = f"<div class='psb-box'>\n<span class='problem'>**Problem:** </span>{p}\n\n<span class='solution'>**Solution:** </span>{s}\n\n<span class='benefit'>**Benefit:** </span>{b}\n</div>"
    return f"## {title}\n\n{summary}\n\n{body_md}\n"

def create_banner(width=1200, height=200):
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
    
    # Add company name - Use a more robust font loading approach
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
    
    img.save(CHARTS_DIR / "tni_banner.png")
    print(f"✓  banner saved at {CHARTS_DIR / 'tni_banner.png'}")

def draw_star(draw, x, y, size, color, outline=None):
    """Draw a 5-pointed star"""
    points = []
    for i in range(10):
        # Alternate between outer and inner circle points
        angle_deg = 36 * i - 90  # Start at the top
        angle_rad = np.pi / 180 * angle_deg
        r = size if i % 2 == 0 else size / 2.5
        points.append((x + r * np.cos(angle_rad), y + r * np.sin(angle_rad)))
    draw.polygon(points, fill=color, outline=outline)

# ---------- configuration -------------------------------------------------
OUTPUT_DIR = Path(__file__).parent
CHARTS_DIR = create_directory(OUTPUT_DIR / "charts", quiet=True)

years, revenue = [2025, 2026, 2027, 2028, 2029], [0.12, 0.90, 2.20, 4.00, 6.50]
staff = [1, 4, 7, 11, 15]
streams = {"SaaS": 0.30, "Licenses": 0.75, "Provenance": 0.90, "Services": 4.55}
ato = {"Traditional": 18, "FedRAMP 20x": 3}

# Added more comprehensive metrics
security_incidents = [14, 8, 3, 0, 0]  # Incidents per year with TNI implementation
compliance_time = [120, 60, 30, 15, 7]  # Days to achieve compliance
cost_savings = [0, 0.2, 0.5, 1.2, 2.5]  # Millions saved per year

# Additional competency
competencies = {
    'Live Metrics & D3 Visuals': 1,
    'OWASP ZAP & SBOM per commit': 1,
    'FedRAMP 20x JSON export': 1,
    'Hash-Ledger provenance': 1,
    'Data Anonymization & PII Safeguards': 1,  # New competency
    '508-compliant design system': 1,
    'SAFe PI cadence & I&A culture': 1
}

# More detailed roadmap with specific dates
detailed_roadmap = [
    {'PI': 'PI-1 Live Audit Dashboard', 'Start': '2025-07-01', 'End': '2025-12-31'},
    {'PI': 'PI-2 Hash-Ledger Provenance', 'Start': '2026-01-01', 'End': '2026-06-30'},
    {'PI': 'PI-3 Blockchain Bridge', 'Start': '2026-07-01', 'End': '2026-12-31'},
    {'PI': 'PI-4 AI Anomaly Module', 'Start': '2027-01-01', 'End': '2027-12-31'},
    {'PI': 'PI-5 Defense BI Dashboards', 'Start': '2028-01-01', 'End': '2028-12-31'},
]

# FY25 Q4 detailed project timeline
q4_tasks = [
    {"Task": "Kick-off & Planning", "Start": "2025-07-01", "End": "2025-07-07"},
    {"Task": "Core Implementation", "Start": "2025-07-08", "End": "2025-08-15"},
    {"Task": "CI/CD Integration", "Start": "2025-08-16", "End": "2025-09-15"},
    {"Task": "Documentation & Training", "Start": "2025-09-16", "End": "2025-09-25"},
    {"Task": "Demo & Closeout", "Start": "2025-09-26", "End": "2025-09-30"}
]

# Extended service portfolio with additional Zero-Trust Architecture offering
extended_services = [
    (
        "Prototype Audit Dashboard",
        "Micro‑Purchase ≤ $10 K",
        "5‑widget dashboard; FedRAMP JSON",
        "Instant insight",
    ),
    (
        "Pilot Audit‑as‑a‑Service",
        "SAP ≤ $250 K",
        "Full‑stack + ZAP/SBOM",
        "Cuts prep 40 %",
    ),
    (
        "SaaS License Pack",
        "GSA MAS $30 K/yr",
        "Multi‑tenant dashboards",
        "Always‑on compliance",
    ),
    (
        "Provenance Ledger Add‑On",
        "IDIQ $150 K",
        "Hash‑ledger + Hyperledger",
        "Immutable custody",
    ),
    (
        "Zero‑Trust Architecture",
        "OTA $250-500 K",
        "NIST 800-207 blueprint; ZTA KPI dashboard",
        "Accelerates zero-trust adoption",
    ),
]

# Problem / Solution / Benefit blurbs
PSB = {
    "Executive Snapshot": (
        "Federal missions delay while waiting months or years for ATOs, costing taxpayers billions.",
        "True North's real‑time compliance dashboards export FedRAMP 20x‑ready evidence with military-grade precision.",
        "Slashes ATO wait times from 18+ months to approximately 3 months; critical national security missions launch sooner with full compliance.",
    ),
    "Core Competencies": (
        "Many vendors claim compliance expertise but lack the technical depth and military discipline to deliver.",
        "Six battle-tested capabilities—from real-time WebSocket D3 visualizations to immutable SBOM-per-commit security chains.",
        "Prime contractors gain an immediately deployable, audit-ready subcontractor with veteran-led security operations.",
    ),
    "Roadmap (5 Program Increments)": (
        "New security technology without disciplined, phased deployment plans fails at pilot stage, wasting resources.",
        "Military-inspired SAFe Program Increment cadence delivers five precisely scheduled, mission-critical capabilities.",
        "Agency stakeholders gain predictable quarterly progress visibility; funding alignment stays on-target throughout implementation.",
    ),
    "Service Portfolio (excerpt)": (
        "Government contracting officers face complex procurement obstacles when trying innovative security solutions.",
        "True North's comprehensive service menu spans from Micro‑Purchase threshold engagements to enterprise IDIQ contract add‑ons.",
        "Agencies can start with low-risk $10K prototypes and scale to enterprise solutions with proven performance and zero procurement friction.",
    ),
    "Five‑Year Financial Trajectory": (
        "Inaccurate growth projections ignore small‑business ceiling complications and create teaming agreement risks.",
        "True North's precision financial model maintains revenue under small business thresholds through FY27 with controlled scaling.",
        "Prime contractors can confidently team without risking size standard complications while enabling veteran-focused growth.",
    ),
    "FedRAMP 20x Impact": (
        "Manual security compliance processes and paper-based evidence packages create massive authorization backlogs.",
        "True North's tactical dashboards continuously emit OSCAL JSON evidence compatible with FedRAMP 20x automated processing.",
        "Revolutionary improvement cuts Moderate Authority to Operate timeline by approximately 83%, enabling faster mission execution.",
    ),
    "Security Metrics Impact": (
        "Organizations struggle to demonstrate security ROI with traditional compliance approaches.",
        "True North's continuous monitoring provides real-time security improvement metrics tied to mission outcomes.",
        "Leadership gains quantifiable evidence of security posture improvement and clear financial return on security investment.",
    ),
    "Veteran Leadership Advantage": (
        "Technical teams often lack the disciplined leadership needed for high-stakes security implementations.",
        "True North brings legendary work ethic and military precision to every engagement with battle-tested processes.",
        "Agencies gain the proven reliability of America's heartland veterans who understand both the mission and the technology at stake.",
    ),
    "FY25 Q4 Project Implementation": (
        "New programs struggle with first-time implementation and establishing trust with stakeholders.",
        "True North provides a clear, predictable delivery timeline with defined milestones and military precision.",
        "Clients receive transparent progress tracking and early confidence in delivery capabilities.",
    ),
    "Go-to-Market Strategy": (
        "Innovative security startups struggle to establish credibility and access federal contract vehicles.",
        "True North employs a phased approach leveraging veteran networks and legendary business ethic for precise channel targeting.",
        "Low-risk entry points for clients and predictable growth for True North's veteran-led team from America's heartland.",
    ),
}

# ---------- vibrant patriotic charts ------------------------------------------------
# Create the banner image
create_banner()

# Revenue projection chart - Enhanced with 3D effect and annotations
save_chart(
    "revenue",
    lambda: (
        plt.figure(figsize=(7, 4)),
        plt.bar(years, revenue, color=TNI_COLORS['navy'], 
                edgecolor=TNI_COLORS['gold'], linewidth=1),
        plt.title("True North Insights Revenue Projection", 
                  fontsize=16, color=TNI_COLORS['navy'], fontweight='bold'),
        plt.xlabel("Fiscal Year", fontsize=12),
        plt.ylabel("Millions USD", fontsize=12),
        plt.grid(axis='y', alpha=0.3),
        # Add data labels on bars
        [plt.text(x, y+0.1, f"${y}M", ha='center', fontweight='bold', 
                 color=TNI_COLORS['red']) for x, y in zip(years, revenue)],
        plt.annotate("SBIR Phase I", xy=(2025, 0.12), xytext=(2025, 0.5),
                    arrowprops=dict(facecolor=TNI_COLORS['red'], shrink=0.05),
                    fontsize=10, color=TNI_COLORS['red'], ha='center'),
        plt.annotate("FedRAMP Ready", xy=(2027, 2.2), xytext=(2027, 3),
                    arrowprops=dict(facecolor=TNI_COLORS['navy'], shrink=0.05),
                    fontsize=10, color=TNI_COLORS['navy'], ha='center')
    ),
)

# Headcount chart - Updated with 100% Army Veterans with subtler regional references
save_chart(
    "staff",
    lambda: (
        plt.figure(figsize=(7, 4)),
        plt.plot(years, staff, marker='o', markersize=10, color=TNI_COLORS['army_green'], 
                 linewidth=3, drawstyle='steps-post'),
        plt.fill_between(years, staff, alpha=0.2, color=TNI_COLORS['army_green'], step='post'),
        plt.title("True North Team Growth - 100% Army Veteran Workforce", 
                  fontsize=16, color=TNI_COLORS['navy'], fontweight='bold'),
        plt.xlabel("Fiscal Year", fontsize=12),
        plt.ylabel("Team Members", fontsize=12),
        plt.grid(alpha=0.3),
        # Updated veteran percentage annotations to 100% Army Veterans
        [plt.text(x, y+0.5, f"{y} (100% Army Veterans)", 
                 ha='center', fontsize=10, 
                 color=TNI_COLORS['navy'], fontweight='bold') 
         for i, (x, y) in enumerate(zip(years, staff))],
        plt.annotate("SDVOSB\nThreshold", xy=(2026, 4), xytext=(2025.7, 6),
                    arrowprops=dict(arrowstyle="->", color=TNI_COLORS['navy']),
                    fontsize=10, color=TNI_COLORS['navy']),
        # Add "Be Legendary" motto and change HOOAH to Hoorah
        plt.figtext(0.5, 0.02, "Hoorah! - Be Legendary", ha='center', 
                   fontsize=12, color=TNI_COLORS['army_green'], 
                   fontweight='bold', style='italic')
    ),
)

# Revenue split - Enhanced with exploded pie chart for emphasis
save_chart(
    "revenue_split",
    lambda: (
        plt.figure(figsize=(7, 5)),
        plt.pie(streams.values(), 
               labels=[f"{k}\n(${v}M)" for k, v in streams.items()],
               autopct='%1.1f%%', 
               colors=[TNI_COLORS['light_blue'], TNI_COLORS['gold'], 
                       TNI_COLORS['red'], TNI_COLORS['navy']],
               wedgeprops=dict(edgecolor='white', linewidth=2),
               explode=(0.05, 0, 0.1, 0), # Explode provenance and SaaS slices
               shadow=True,
               startangle=140),
        plt.title("FY29 Revenue Distribution by Product Line\n(Total: $6.5M)", 
                 fontsize=16, color=TNI_COLORS['navy'], fontweight='bold', pad=20),
        plt.figtext(0.5, 0.01, "Provenance line provides highest margins", 
                   ha='center', color=TNI_COLORS['red'], style='italic')
    ),
)

# ATO timeline comparison - Enhanced with annotations and styling
save_chart(
    "ato_timeline",
    lambda: (
        plt.figure(figsize=(7, 4)),
        plt.bar(list(ato.keys()), list(ato.values()), 
               color=[TNI_COLORS['red'], TNI_COLORS['navy']],
               edgecolor='white', linewidth=2),
        plt.title("Authority to Operate (ATO) Timeline Comparison", 
                 fontsize=16, color=TNI_COLORS['navy'], fontweight='bold'),
        plt.ylabel("Months to Authorization", fontsize=12),
        plt.grid(axis='y', alpha=0.3),
        # Add data labels on bars
        [plt.text(i, v+0.5, f"{v} months", ha='center', color='white', 
                 fontweight='bold') for i, v in enumerate(ato.values())],
        # Add percentage improvement
        plt.figtext(0.5, 0.01, "83% time reduction with True North's FedRAMP 20x approach", 
                   ha='center', color=TNI_COLORS['red'], fontweight='bold', fontsize=12),
        plt.annotate("Traditional Approach", xy=(0, 18), xytext=(0, 20),
                    ha='center', color=TNI_COLORS['red']),
        plt.annotate("True North Approach", xy=(1, 3), xytext=(1, 5),
                    ha='center', color=TNI_COLORS['navy'])
    ),
)

# Security incidents chart - NEW
save_chart(
    "security_incidents",
    lambda: (
        plt.figure(figsize=(7, 4)),
        # Add data labels
        [plt.text(x, y+0.5, str(y), ha='center', fontweight='bold', 
                 color=TNI_COLORS['navy']) for x, y in zip(years, security_incidents)]
    ),
)

# Compliance timeline - NEW
save_chart(
    "compliance_time",
    lambda: (
        plt.figure(figsize=(7, 4)),
        plt.plot(years, compliance_time, marker='s', color=TNI_COLORS['navy'], 
                linewidth=3, markersize=10),
        plt.fill_between(years, compliance_time, alpha=0.2, color=TNI_COLORS['navy']),
        plt.title("Compliance Documentation Time with True North", 
                 fontsize=16, color=TNI_COLORS['navy'], fontweight='bold'),
        plt.xlabel("Fiscal Year", fontsize=12),
        plt.ylabel("Days to Documentation", fontsize=12),
        plt.grid(alpha=0.3),
        # Add data labels
        [plt.text(x, y+5, f"{y} days", ha='center', fontweight='bold', 
                 color=TNI_COLORS['red']) for x, y in zip(years, compliance_time)]
    ),
)

# ROI and cost savings - NEW
save_chart(
    "cost_savings",
    lambda: (
        plt.figure(figsize=(7, 4)),
        plt.bar(years, cost_savings, color=TNI_COLORS['navy'], 
               edgecolor=TNI_COLORS['gold'], linewidth=1),
        plt.title("Cost Savings with True North Compliance Automation", 
                 fontsize=16, color=TNI_COLORS['navy'], fontweight='bold'),
        plt.xlabel("Fiscal Year", fontsize=12),
        plt.ylabel("Annual Savings (Millions USD)", fontsize=12),
        plt.grid(axis='y', alpha=0.3),
        # Calculate and display ROI
        plt.figtext(0.5, 0.01, f"5-Year ROI: {sum(cost_savings)/sum(revenue[:len(cost_savings)])*100:.0f}% | Total Savings: ${sum(cost_savings)}M", 
                   ha='center', color=TNI_COLORS['red'], fontweight='bold', fontsize=12)
    ),
)

# Create veteran leadership infographic - Updated with subtler regional references
save_chart(
    "veteran_leadership",
    lambda: (
        plt.figure(figsize=(8, 4.5)),
        plt.axis('off'),
        plt.title("True North's Army Veteran Leadership Advantage", 
                 fontsize=16, color=TNI_COLORS['navy'], fontweight='bold'),
        # Create background with Army green accent
        plt.fill([0, 10, 10, 0], [0, 0, 5, 5], alpha=0.1, color=TNI_COLORS['army_green']),
        # Add subtle badge instead of state outline
        plt.fill([8.0, 9.5, 9.5, 8.0], [3.2, 3.2, 4.0, 4.0], color=TNI_COLORS['nd_blue'], alpha=0.4),
        plt.text(8.8, 3.6, "HEARTLAND", color='white', ha='center', fontsize=8, fontweight='bold'),
        # Add "Be Legendary" text with more prominence
        plt.text(8.8, 2.9, "BE LEGENDARY", ha='center', color=TNI_COLORS['gold'], 
               fontsize=10, fontweight='bold', style='italic'),
        # Add text elements
        plt.text(4.5, 4, "ARMY VETERAN PRECISION", fontsize=14, 
                color=TNI_COLORS['navy'], ha='center', fontweight='bold'),
        plt.text(4.5, 3.5, "Mission-Focused Leadership", fontsize=12, 
                color=TNI_COLORS['navy'], ha='center'),
        # Add key points with subtler regional references
        plt.text(2, 2.8, "✓ Heartland work ethic", fontsize=11, 
                color=TNI_COLORS['red']),
        plt.text(2, 2.4, "✓ Legendary commitment to excellence", fontsize=11, 
                color=TNI_COLORS['red']),
        plt.text(2, 2.0, "✓ Resilience in challenging missions", fontsize=11, 
                color=TNI_COLORS['red']),
        plt.text(7, 2.8, "✓ Battle-tested processes", fontsize=11, 
                color=TNI_COLORS['red']),
        plt.text(7, 2.4, "✓ Mission-first mentality", fontsize=11, 
                color=TNI_COLORS['red']),
        plt.text(7, 2.0, "✓ Disciplined execution", fontsize=11, 
                color=TNI_COLORS['red']),
        plt.text(7, 1.6, "✓ Security mindset", fontsize=11, 
                color=TNI_COLORS['red']),
        plt.text(7, 1.2, "✓ Adaptable under pressure", fontsize=11, 
                color=TNI_COLORS['red']),
        # Update statistic to 100% Army veterans without mentioning specific location
        plt.text(4.5, 0.7, "100% Army veterans - Committed to American excellence", fontsize=12, 
                color=TNI_COLORS['army_green'], ha='center', fontweight='bold'),
        # Add stars in a patriotic arrangement
        [draw_matplotlib_star(2+i*1.5, 2, 0.2, TNI_COLORS['gold']) for i in range(3)]
    ),
)

# Add new visualizations to the charts collection
def create_competencies_pie():
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
    return plt

def create_roadmap_gantt():
    """Creates a Gantt chart for the five-year roadmap"""
    df_rm = pd.DataFrame(detailed_roadmap)
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
    ax.set_title('Five-Year Strategic Roadmap', fontsize=16, 
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
    return plt

def create_q4_project_timeline():
    """Creates a Gantt chart for the FY25 Q4 Project Timeline"""
    df_q4 = pd.DataFrame(q4_tasks)
    df_q4['Start'] = pd.to_datetime(df_q4['Start'])
    df_q4['End'] = pd.to_datetime(df_q4['End'])
    df_q4['StartNum'] = mdates.date2num(df_q4['Start'])
    df_q4['EndNum'] = mdates.date2num(df_q4['End'])
    df_q4['Duration'] = df_q4['EndNum'] - df_q4['StartNum']
    
    # Create the figure
    fig, ax = plt.subplots(figsize=(10, 4))
    
    # Plot the Gantt bars
    colors = [TNI_COLORS['navy'], TNI_COLORS['light_blue'], 
              TNI_COLORS['red'], TNI_COLORS['light_blue'], TNI_COLORS['navy']]
    
    for i, task in df_q4.iterrows():
        ax.barh(task['Task'], task['Duration'], left=task['StartNum'],
               color=colors[i % len(colors)], height=0.5,
               edgecolor='white', linewidth=1)
    
    # Format the x-axis as dates
    ax.set_xlabel('Date (FY25 Q4)', fontsize=12, fontweight='bold')
    ax.set_title('FY25 Q4 Project Implementation Timeline', 
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
    return plt

# Add the new charts to the save_chart function calls
save_chart(
    "competencies_pie",
    create_competencies_pie
)

save_chart(
    "roadmap_gantt",
    create_roadmap_gantt
)

save_chart(
    "q4_timeline",
    create_q4_project_timeline
)

# ---------- assemble enhanced markdown --------------------------------------------
def tbl(rows, hdr):
    """Create a markdown table from rows and header"""
    out = ["| " + " | ".join(hdr) + " |", "| " + " | ".join("---" * len(hdr)) + " |"]
    out += ["| " + " | ".join(r) + " |" for r in rows]
    return "\n".join(out)

roadmap = [
    (
        "PI‑1 FY 25 H2",
        "Live Audit Dashboard",
        "Ends spreadsheet audits; P‑Card friendly",
    ),
    ("PI‑2 FY 26 H1", "Hash‑Ledger Provenance", "Every config & log traceable"),
    ("PI‑3 FY 26 H2", "Blockchain Bridge", "Immutable chain‑of‑custody"),
    ("PI‑4 FY 27", "AI Anomaly Module", "2 s triage meets zero‑trust SLA"),
    ("PI‑5 FY 28", "Defense BI Dashboards", "Force‑readiness & asset tracking"),
]

services = [
    (
        "Prototype Audit Dashboard",
        "Micro‑Purchase ≤ $10 K",
        "5‑widget dashboard; FedRAMP JSON",
        "Instant insight",
    ),
    (
        "Pilot Audit‑as‑a‑Service",
        "SAP ≤ $250 K",
        "Full‑stack + ZAP/SBOM",
        "Cuts prep 40 %",
    ),
    (
        "SaaS License Pack",
        "GSA MAS $30 K/yr",
        "Multi‑tenant dashboards",
        "Always‑on compliance",
    ),
    (
        "Provenance Ledger Add‑On",
        "IDIQ $150 K",
        "Hash‑ledger + Hyperledger",
        "Immutable custody",
    ),
]

finance = [
    ("2025", "12 micro‑purchases", "0.12"),
    ("2026", "24 micro + 1 pilot", "0.90"),
    ("2027", "3 dashboards + SaaS prep", "2.20"),
    ("2028", "SaaS + 3 licenses", "4.00"),
    ("2029", "Provenance + seats", "6.50"),
]

sections = [
    section("Executive Snapshot", 
           "![True North Banner](charts/tni_banner.png)\n\n"
           "True North Insights delivers military-grade compliance solutions that accelerate mission delivery for federal agencies. "
           "Our veteran-led team brings precision, reliability, and security expertise to government technology challenges.\n\n"
           "**MISSION:** To secure America's digital infrastructure with unwavering integrity and veteran-led excellence.\n\n"),
    
    section(
        "Core Competencies",
        "![Core Competencies](charts/competencies_pie.png)\n\n" +
        "\n".join(
            [
                "- **Live Metrics & D3 Visuals (WebSocket)** - Real-time security monitoring with military-inspired tactical displays",
                "- **OWASP ZAP & SBOM per commit** - Continuous security validation with cryptographic supply chain verification",
                "- **FedRAMP 20x JSON evidence export** - Automated compliance documentation ready for accelerated processing",
                "- **Hash-Ledger provenance + optional Hyperledger** - Immutable audit trails with blockchain-level integrity",
                "- **Data Anonymization & PII Safeguards** - Automated masking and privacy controls for sensitive information",
                "- **508-compliant design system** - Accessible interfaces ensuring mission availability for all personnel",
                "- **SAFe PI cadence & I&A culture** - Military-inspired agile development with intelligence and adaptability",
            ]
        ) + "\n\n![Veteran Leadership](charts/veteran_leadership.png)",
    ),
    
    section(
        "Roadmap (5 Program Increments)",
        "![Roadmap Timeline](charts/roadmap_gantt.png)\n\n" +
        tbl(roadmap, ["Increment", "Deliverable", "Outcome"]) +
        "\n\nEach Program Increment follows military-grade planning and execution standards with transparent metrics and accountability.",
    ),
    
    section(
        "Service Portfolio (excerpt)",
        tbl(extended_services, ["Engagement", "Vehicle / Ceiling", "Deliverables", "Outcome"]) +
        "\n\nAll services delivered with veteran-led teams bringing military precision and unwavering integrity to every engagement.",
    ),
    
    section(
        "Five‑Year Financial Trajectory",
        tbl(finance, ["FY", "Drivers", "Revenue (M)"]) +
        "\n\n<div align='center'><img src='charts/revenue.png' width='48%' style='margin-right:10px'><img src='charts/staff.png' width='48%'></div>\n\n" +
        "<div align='center'><img src='charts/revenue_split.png' width='60%'></div>"
    ),
    
    section(
        "FedRAMP 20x Impact",
        "<div align='center'><img src='charts/ato_timeline.png' width='100%'></div>\n\n"
        "The FedRAMP 20x initiative modernizes cloud service authorization through automation. True North's solutions are specifically designed to "
        "integrate with this process, providing machine-readable OSCAL documentation that dramatically accelerates authorization timelines."
    ),
    
    section(
        "Security Metrics Impact",
        "<div align='center'><img src='charts/security_incidents.png' width='48%' style='margin-right:10px'><img src='charts/compliance_time.png' width='48%'></div>\n\n" +
        "<div align='center'><img src='charts/cost_savings.png' width='60%'></div>\n\n" +
        "True North's approach delivers quantifiable security improvements and measurable return on investment. Our military-precision metrics "
        "provide leadership with the insight needed to make informed security decisions and demonstrate tangible value to stakeholders."
    ),
    
    section(
        "Veteran Leadership Advantage",
        "True North Insights is proudly 100% Army veteran-owned and operated, bringing military discipline and legendary work ethic to government technology solutions. "
        "Our leadership team includes veterans who embody the 'Be Legendary' spirit in every engagement with federal agencies.\n\n"
        "**Core Values:**\n"
        "- **Integrity:** Unwavering commitment to truth and ethical standards\n"
        "- **Excellence:** Military-grade precision with heartland reliability\n"
        "- **Service:** Putting mission and country first\n"
        "- **Innovation:** American ingenuity solving complex challenges\n\n"
        "\n\n**\"Hoorah! We bring legendary commitment to your technology mission.\"**"
    ),
    
    section(
        "FY25 Q4 Project Implementation",
        "![Q4 Project Timeline](charts/q4_timeline.png)\n\n" +
        "Our first micro-purchase project delivers a **FedRAMP 20× JSON Export Proof-of-Concept** with the following phases:\n\n" +
        tbl([
            ("July 1-7, 2025", "Kick-off & Planning", "Charter; schema documentation"),
            ("July 8 - Aug 15, 2025", "Core Implementation", "Working script + Angular component"), 
            ("Aug 16 - Sep 15, 2025", "CI/CD Integration", "GitLab CI jobs; validation reports"),
            ("Sep 16-25, 2025", "Documentation & Training", "README; OpenAPI spec; training"),
            ("Sep 26-30, 2025", "Demo & Closeout", "Stakeholder demo; feedback capture")
        ], ["Timeframe", "Phase", "Deliverables"]) +
        "\n\nThis initial project serves as a foundation for future engagements and demonstrates our military-precision delivery capabilities."
    ),
    
    section(
        "Go-to-Market Strategy", 
        "True North's go-to-market approach leverages our veteran network and legendary business ethic:\n\n" +
        "- **Anchor Pilots:** Strategic pilots with defense agencies (micro-purchases)\n" +
        "- **Thought Leadership:** \"Road to Immutable Audit\" blog series & Bunker Labs program\n" +
        "- **Delivery Cadence:** Quarterly PI Planning with Inspect-&-Adapt cycles every 8-12 weeks\n" +
        "- **Veteran Network:** Leveraging connections from military service for introductions to prime contractors\n" +
        "- **Strategic Location:** Midwest headquarters provides additional contracting advantages\n" +
        "- **Legendary Advantage:** Bringing \"Be Legendary\" work ethic to every federal engagement\n\n" +
        "Our approach exemplifies heartland values: starting small, proving our worth through honest work, and growing based on earned trust and proven performance."
    ),
]

full_md = (
    "# True North Insights · Five‑Year Capability & Growth Blueprint (FY 25‑29)\n\n"
    "<div align='center'><h2>🇺🇸 Veteran-Owned · Remote-First · FedRAMP-Ready 🇺🇸</h2></div>\n\n"
    + "\n".join(sections)
    + "\n---\n"
    + "<div align='center'><p><strong>True North Insights, LLC</strong> | Proud to serve America's technology needs</p>\n"
    + "<p><strong>Contact:</strong> jeffreysanford@gmail.com | <strong>Website:</strong> www.truenorthinsights.com</p></div>"
)

(OUTPUT_DIR / "business_plan.md").write_text(ascii_only(full_md), encoding="utf-8")
print("✅  Enhanced business_plan.md refreshed with patriotic styling and comprehensive visuals")

def main():
    print_header("True North Insights - Business Plan Generator")
    
    # Create the banner and charts
    create_banner()
    
    # Generate all charts
    print("[INFO] Generating business plan charts...")
    # All the chart generation code is already in the file structure
    
    # Assemble and write the business plan markdown
    full_md = (
        "# True North Insights · Five‑Year Capability & Growth Blueprint (FY 25‑29)\n\n"
        "<div align='center'><h2>🇺🇸 Veteran-Owned · Remote-First · FedRAMP-Ready 🇺🇸</h2></div>\n\n"
        + "\n".join(sections)
        + "\n---\n"
        + "<div align='center'><p><strong>True North Insights, LLC</strong> | Proud to serve America's technology needs</p>\n"
        + "<p><strong>Contact:</strong> jeffreysanford@gmail.com | <strong>Website:</strong> www.truenorthinsights.com</p></div>"
    )

    output_file = OUTPUT_DIR / "business_plan.md"
    output_file.write_text(ascii_only(full_md), encoding="utf-8")
    print_success(f"Business Plan generated at {output_file}")
    
    print_header("Business Plan Generation Complete", char="-")
    print("To convert to PDF, run: python export_to_pdf.py business_plan.md")

if __name__ == "__main__":
    main()
