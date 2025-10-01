#!/usr/bin/env python
"""
generate_rmf.py
Creates rmf/rmf_quick_start.md and rmf/rmf_implementation_guide.md with ASCII‑safe characters,
Problem / Solution / Benefit (PSB) summaries with military-grade clarity,
and patriotic styling with legendary commitment design themes.
"""

import datetime, sys
from pathlib import Path
from textwrap import dedent
import matplotlib.pyplot as plt
import numpy as np
import matplotlib.patches as patches
from true_north_common import (
    TNI_COLORS, ascii_only, create_directory, print_header, 
    print_success, setup_matplotlib_style
)

# Configure matplotlib styling
setup_matplotlib_style()

# ---------- create RMF diagram helper -------------------------------
def create_rmf_diagram(output_path):
    """Creates visual RMF process diagram with legendary styling"""
    plt.figure(figsize=(10, 6))
    plt.axis('off')
    
    # Setup
    steps = ['PREPARE', 'CATEGORIZE', 'SELECT', 'IMPLEMENT', 'ASSESS', 'AUTHORIZE', 'MONITOR']
    colors = [TNI_COLORS['navy'], TNI_COLORS['light_blue'], TNI_COLORS['navy'], 
              TNI_COLORS['light_blue'], TNI_COLORS['navy'], TNI_COLORS['red'], 
              TNI_COLORS['light_blue']]
    
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
    
    # Add continuous monitoring arrow back to step 1
    plt.arrow(center_x + radius * np.cos(2*np.pi*6/7) + 0.5*np.cos(2*np.pi*6/7), 
             center_y + radius * np.sin(2*np.pi*6/7) + 0.5*np.sin(2*np.pi*6/7),
             radius * 1.5 * np.cos(np.pi), radius * 1.5 * np.sin(np.pi),
             head_width=0.15, head_length=0.2, fc=TNI_COLORS['gold'], ec=TNI_COLORS['gold'],
             linestyle='dashed')
    
    # Add True North branding with more subtle ND reference
    plt.text(center_x, center_y-0.3, "TRUE NORTH INSIGHTS", ha='center', fontsize=16, 
            color=TNI_COLORS['navy'], fontweight='bold')
    plt.text(center_x, center_y, "RMF PROCESS", ha='center', fontsize=14,
            color=TNI_COLORS['red'])
    plt.text(center_x, center_y+0.3, "Legendary Precision", ha='center', fontsize=10,
            color=TNI_COLORS['nd_blue'], style='italic')
    
    # Add small state outline in corner with subtler labeling
    nd_x, nd_y = 9.0, 0.7
    nd_width, nd_height = 0.7, 0.4
    
    # Draw ND shape as a simplified rectangle with rounded corners
    nd_rect = patches.FancyBboxPatch((nd_x, nd_y), nd_width, nd_height,
                                    boxstyle="round,pad=0.02",
                                    fc=TNI_COLORS['nd_blue'], alpha=0.7)
    plt.gca().add_patch(nd_rect)
    
    # Fixed line with syntax error - added '=' sign to 'color='
    plt.text(nd_x + nd_width/2, nd_y + nd_height/2, "ND",
             ha='center', va='center', color=TNI_COLORS['navy'], fontweight='bold')
    
    plt.text(nd_x + nd_width/2, nd_y + nd_height + 0.1, "Be Legendary",
             ha='center', va='center', color=TNI_COLORS['nd_blue'], 
             fontsize=8, style='italic', fontweight='bold')
    
    plt.savefig(output_path, dpi=150, bbox_inches='tight')
    plt.close()
    print(f"[OK] RMF diagram created at {output_path}")

# ---------- create comparison chart helper --------------------------
def create_compliance_comparison(output_path):
    """Creates comparison chart between traditional and TNI compliance approaches"""
    # Data
    categories = ['Evidence Time', 'Documentation Effort', 'Error Rate', 'Updates per Year']
    
    # Values (lower is better)
    traditional = [100, 95, 65, 10]  # Traditional approach
    tni = [20, 25, 5, 50]            # True North approach
    
    # Create bar chart
    fig, ax = plt.subplots(figsize=(10, 6))
    
    # Set width of bars
    barWidth = 0.35
    positions1 = np.arange(len(categories))
    positions2 = [x + barWidth for x in positions1]
    
    # Create bars
    plt.bar(positions1, traditional, width=barWidth, color=TNI_COLORS['red'], 
           edgecolor='white', alpha=0.8, label='Traditional Approach')
    plt.bar(positions2, tni, width=barWidth, color=TNI_COLORS['navy'], 
           edgecolor='white', alpha=0.8, label='True North Approach')
    
    # Add labels and title
    plt.title('True North vs. Traditional Compliance', fontsize=16, fontweight='bold', 
             color=TNI_COLORS['navy'])
    plt.xlabel('Metrics (Lower is better except Updates)', fontsize=12)
    plt.ylabel('Relative Score', fontsize=12)
    plt.xticks([p + barWidth/2 for p in positions1], categories)
    
    # Create legend and grid
    plt.legend(loc='upper right')
    plt.grid(axis='y', linestyle='--', alpha=0.7)
    
    # Add improvement percentages
    for i in range(len(categories)):
        if i < 3:  # For metrics where lower is better
            improvement = ((traditional[i] - tni[i]) / traditional[i]) * 100
            plt.text(positions1[i] + barWidth/2, max(traditional[i], tni[i]) + 5, 
                    f"{improvement:.0f}% better", ha='center', fontsize=10, 
                    color=TNI_COLORS['navy'], fontweight='bold')
        else:  # For updates where higher is better
            improvement = ((tni[i] - traditional[i]) / traditional[i]) * 100
            plt.text(positions1[i] + barWidth/2, max(traditional[i], tni[i]) + 5, 
                    f"{improvement:.0f}% better", ha='center', fontsize=10, 
                    color=TNI_COLORS['navy'], fontweight='bold')
    
    # Add more subtle heartland reference
    plt.figtext(0.5, 0.01, "Legendary precision from America's heartland", 
               ha='center', fontsize=10, color=TNI_COLORS['nd_blue'], style='italic')
    
    plt.savefig(output_path, dpi=150, bbox_inches='tight')
    plt.close()
    print(f"[OK] Compliance comparison chart created at {output_path}")

# ---------- create RMF implementation timeline -------------------------
def create_rmf_timeline(output_path):
    """Creates a timeline of RMF implementation phases"""
    fig, ax = plt.subplots(figsize=(10, 5))
    
    # Timeline data
    phases = ['Planning', 'Development', 'Testing', 'Authorization', 'Operations']
    durations = [60, 90, 45, 30, 90]  # Days for each phase
    starts = [0]
    for i in range(1, len(durations)):
        starts.append(starts[i-1] + durations[i-1])
    
    # Colors
    colors = [TNI_COLORS['navy'], TNI_COLORS['light_blue'], 
              TNI_COLORS['red'], TNI_COLORS['gold'], TNI_COLORS['navy']]
    
    # Create horizontal bars
    for i, (phase, duration, start, color) in enumerate(zip(phases, durations, starts, colors)):
        ax.barh(phase, duration, left=start, color=color, alpha=0.7, 
                edgecolor='white', height=0.6)
        
        # Add text labels
        ax.text(start + duration/2, i, f"{duration} days", 
                ha='center', va='center', color='white', fontweight='bold')
    
    # Add milestones
    milestones = [
        {'name': 'SSP Draft', 'day': 40, 'phase': 'Planning'},
        {'name': 'Controls Implemented', 'day': 130, 'phase': 'Development'},
        {'name': 'Assessment Complete', 'day': 180, 'phase': 'Testing'},
        {'name': 'ATO Granted', 'day': 220, 'phase': 'Authorization'},
        {'name': 'First Review', 'day': 280, 'phase': 'Operations'}
    ]
    
    for milestone in milestones:
        phase_idx = phases.index(milestone['phase'])
        ax.scatter(milestone['day'], phase_idx, color=TNI_COLORS['gold'], 
                   s=100, zorder=10, edgecolor='white')
        ax.annotate(milestone['name'],
                   (milestone['day'], phase_idx),
                   xytext=(0, -20),
                   textcoords='offset points',
                   ha='center',
                   va='center',
                   fontsize=8,
                   color=TNI_COLORS['dark_gray'])
    
    # Style the chart
    ax.set_xlim(0, sum(durations) + 10)
    ax.set_title('RMF Implementation Timeline', fontsize=16, 
                color=TNI_COLORS['navy'], fontweight='bold')
    ax.set_xlabel('Days', fontsize=12)
    ax.xaxis.grid(True, linestyle='--', alpha=0.7)
    
    # Add more subtle commitment reference
    plt.figtext(0.5, 0.01, "Delivering on time with legendary commitment", 
               ha='center', fontsize=10, color=TNI_COLORS['nd_blue'], 
               style='italic', fontweight='bold')
    
    plt.savefig(output_path, dpi=150, bbox_inches='tight')
    plt.close()
    print(f"[OK] RMF timeline created at {output_path}")

# ---------- create controls distribution chart ------------------------
def create_controls_chart(output_path):
    """Creates a pie chart showing distribution of security controls by family"""
    # Control families and counts (based on moderate baseline)
    families = {
        'Access Control (AC)': 44,
        'Audit & Accountability (AU)': 16,
        'Security Assessment (CA)': 9,
        'Configuration Mgmt (CM)': 22,
        'Identification & Auth (IA)': 11,
        'Incident Response (IR)': 8,
        'Risk Assessment (RA)': 6,
        'System & Comms (SC)': 44,
        'Other Families': 33  # Combined smaller families
    }
    
    # Create figure
    plt.figure(figsize=(10, 7))
    
    # Create color palette
    colors = [TNI_COLORS['navy'], TNI_COLORS['light_blue'], TNI_COLORS['red'],
              TNI_COLORS['gold'], TNI_COLORS['nd_blue'], TNI_COLORS['army_green'],
              '#6A5ACD', '#2E8B57', '#808080']
    
    # Create pie chart
    wedges, texts, autotexts = plt.pie(
        families.values(),
        labels=None,
        autopct='%1.1f%%',
        startangle=90,
        colors=colors,
        wedgeprops=dict(width=0.5, edgecolor='white')
    )
    
    # Style the text properties
    for autotext in autotexts:
        autotext.set_color('white')
        autotext.set_fontweight('bold')
    
    # Add legend
    plt.legend(
        wedges,
        [f"{k} ({v})" for k, v in families.items()],
        title="Control Families",
        loc="center left",
        bbox_to_anchor=(1, 0, 0.5, 1)
    )
    
    # Add title
    plt.title('FedRAMP Moderate Controls Distribution', 
             fontsize=16, color=TNI_COLORS['navy'], fontweight='bold')
    
    # Add True North branding
    plt.figtext(0.5, 0.01, "True North Insights - Be Legendary", 
               ha='center', fontsize=10, color=TNI_COLORS['nd_blue'], 
               style='italic', fontweight='bold')
    
    plt.savefig(output_path, dpi=150, bbox_inches='tight')
    plt.close()
    print(f"[OK] Controls distribution chart created at {output_path}")

# ---------- basic config -------------------------------------------
ORG     = "True North Insights, LLC"
SYSTEM  = "TNI Audit‑as‑a‑Service"
ABBREV  = "TNI‑AaaS"
IMPACT  = "Moderate"
AO      = "Designated AO, DoD CIO"
CONTACT = "jeffreysanford@gmail.com"
BASE    = "FedRAMP Moderate"

# Enhanced with more detail
MISSION = "Providing military-grade audit capabilities to secure America's digital infrastructure with legendary precision"
VISION = "To be the trusted partner for mission-critical compliance and security operations, embodying the commitment to excellence"

SUBSYSTEMS = [
    ("Front‑End SPA", "Angular 17 via NGINX, WCAG/508 compliant", "Tactical display with real-time metrics"),
    ("API Gateway",   "NestJS WebSocket + REST, JWT auth", "Secure, real-time data transmission"),
    ("Data Layer",    "PostgreSQL 15 + Hash Ledger", "Immutable audit trail with cryptographic verification"),
    ("CI/CD",         "nx monorepo, GitLab runners, Terraform IaC", "Automated compliance validation on every commit")
]

RMF_STEPS = [
    ("Prepare",    "Define SCRM policy and SAFe roles", "P-1", "Mission-focused security strategy with North Dakota reliability"),
    ("Categorize", "FIPS‑199 MOD → FedRAMP Moderate", "C-1", "Appropriate controls for information sensitivity"),
    ("Select",     "Tailor baseline—remove PE‑6, add SC‑23 mobile admin", "S-1", "Right-sized security without unnecessary overhead"),
    ("Implement",  "IaC + GitLab CI; controls as code", "I-2", "Automated compliance with every deployment"),
    ("Assess",     "Internal 3PAO using InSpec & e2e tests", "A-1", "Continuous validation of security posture"),
    ("Authorize",  "FedRAMP 20x JSON evidence to AO", "A-2", "Accelerated approval for mission delivery"),
    ("Monitor",    "WebSocket telemetry to hash‑ledger; PI‑based POA&M", "M-1", "Real-time security visibility with integrity")
]

PSB_BLOCKS = [
    {
        "problem": "Legacy spreadsheet evidence loses audit lineage and creates compliance gaps.",
        "solution": "Single‑stack Angular/NestJS platform with military-grade hash‑ledger validation from True North's veteran team.",
        "benefit": "Real‑time, tamper-evident control evidence with cryptographic integrity guarantees and legendary reliability."
    },
    {
        "problem": "Paper control matrices slow FedRAMP packages and delay critical missions.",
        "solution": "Evidence exported in OSCAL JSON and hash‑ledger with automated verification from America's heartland.",
        "benefit": "Connects directly to FedRAMP 20x automated queue, reducing ATO time by 83% with North Dakota precision."
    },
    {
        "problem": "Manual audit processes drain mission resources and introduce human error.",
        "solution": "Continuous monitoring with tactical dashboards and real-time metrics built with legendary commitment.",
        "benefit": "Agencies maintain compliance with 75% less effort while improving security posture through veteran-led implementation."
    }
]

# Add implementation tips for each RMF step
RMF_IMPLEMENTATION_TIPS = {
    "Prepare": [
        "Document system boundaries with precision using network diagrams",
        "Establish clear roles and responsibilities for security governance",
        "Develop Supply Chain Risk Management (SCRM) policy before procurement",
        "True North Tip: Integrate SAFe program increment planning with security milestones"
    ],
    "Categorize": [
        "Use FIPS 199 worksheets to analyze impact levels for CIA triad",
        "Document all information types processed by the system",
        "Consider privacy impacts alongside security categorization",
        "True North Tip: Map information flows between subsystems to identify hidden dependencies"
    ],
    "Select": [
        "Start with FedRAMP Moderate baseline for most federal systems",
        "Document all control tailoring decisions with clear justifications",
        "Consider hybrid controls that span multiple systems",
        "True North Tip: Use our control inheritance matrix to maximize reuse of existing controls"
    ],
    "Implement": [
        "Prioritize implementation of technical controls that can be automated",
        "Document configurations in machine-readable formats",
        "Use Infrastructure as Code (IaC) for repeatable deployments",
        "True North Tip: Our GitLab CI templates automate 85% of control verification"
    ],
    "Assess": [
        "Develop assessment procedures before implementation begins",
        "Use continuous monitoring tools to gather evidence automatically",
        "Track findings in a centralized POA&M management system",
        "True North Tip: Our hash-ledger provides cryptographic proof of control testing"
    ],
    "Authorize": [
        "Prepare executive summary of system risks for authorizing official",
        "Use FedRAMP templates for authorization packages",
        "Document residual risk acceptance clearly",
        "True North Tip: Our OSCAL JSON exports speed authorization by 83%"
    ],
    "Monitor": [
        "Implement automated scanning on a continuous basis",
        "Establish metrics for ongoing security effectiveness",
        "Set clear thresholds for risk acceptance and escalation",
        "True North Tip: Our real-time dashboards show compliance status with military precision"
    ]
}

# ---------- build quick start markdown -----------------------------
def build_quick_start_markdown() -> str:
    today = datetime.date.today()
    charts_dir = Path("rmf") / "charts"
    create_directory(charts_dir)
    
    # Create visual assets
    create_rmf_diagram(charts_dir / "rmf_process.png")
    create_compliance_comparison(charts_dir / "compliance_comparison.png")
    create_rmf_timeline(charts_dir / "rmf_timeline.png")
    create_controls_chart(charts_dir / "controls_distribution.png")

    # Header
    md  = f"# {SYSTEM} — RMF Quick Start\n\n"
    md += dedent(f"""
    <div align="center">
      <p><strong>🇺🇸 Military-Grade Compliance · Veteran-Led Precision · Legendary Commitment 🇺🇸</strong></p>
    </div>

    *Organization :* **{ORG}**  
    *Date :* {today}  
    *Impact Level :* **{IMPACT}**  
    *Authorizing Official :* {AO}

    ----
    ## 1 · System Overview

    **Problem :** {PSB_BLOCKS[0]['problem']}  
    **Solution :** {PSB_BLOCKS[0]['solution']}  
    **Benefit :** {PSB_BLOCKS[0]['benefit']}

    **Mission:** {MISSION}  
    **Vision:** {VISION}  
    **Abbreviation:** `{ABBREV}`

    ### Subsystems
    """)

    md += "\n".join(f"- **{name}** — {desc} — *{note}*" for name, desc, note in SUBSYSTEMS)

    md += "\n\n### Information Types\n"
    md += "| ID | Name | Impact Level | Description |\n"
    md += "|----|------|--------------|-------------|\n"
    md += f"| 122 | Software Configuration | {IMPACT} | System software settings, operational parameters, and technical specifications |\n"
    md += f"| 151 | Audit Logs | {IMPACT} | Records of system events, user actions, and security incidents for analysis |\n"
    md += f"| 171 | Security Management | {IMPACT} | Security control status, vulnerability assessments, and remediation activities |\n"

    # RMF process visualization
    md += "\n\n<div align='center'><img src='charts/rmf_process.png' width='80%' alt='RMF Process Diagram'></div>\n"

    # RMF table
    md += "\n----\n## 2 · RMF Steps & Key Tasks\n\n"
    md += "The Risk Management Framework provides a structured process for implementing security controls and managing risk.\n"
    md += "True North's approach brings North Dakota's legendary precision to each step of the process.\n\n"
    md += "| Step | Task Summary | Control | Outcome |\n| --- | --- | --- | --- |\n"
    md += "\n".join(f"| **{step}** | {task} | {control} | {outcome} |" for step, task, control, outcome in RMF_STEPS)
    md += "\n\nSee the **RMF Implementation Guide** for detailed instructions on completing each step with True North's methodology.\n"

    # PSB + baseline note
    md += dedent(f"""
    \n----  
    **Problem :** {PSB_BLOCKS[1]['problem']}  
    **Solution :** {PSB_BLOCKS[1]['solution']}  
    **Benefit :** {PSB_BLOCKS[1]['benefit']}

    ### Baseline & Control Tailoring
    Starting from **{BASE}**; tailoring decisions captured in `controls-tailor.xlsx` with justifications for each modification.
    
    True North's approach applies military precision and heartland integrity to each control implementation:
    
    - **Control Inheritance** - Maximize reuse from existing infrastructure
    - **Control Implementation** - Automate through CI/CD pipelines with validation
    - **Evidence Collection** - Continuous monitoring with cryptographic integrity
    - **Documentation** - Clear, concise language with straightforward explanations

    <div align='center'><img src='charts/controls_distribution.png' width='80%' alt='Controls Distribution Chart'></div>

    ### Compliance Comparison
    True North's approach significantly reduces compliance burden while improving security outcomes:

    <div align='center'><img src='charts/compliance_comparison.png' width='80%' alt='Compliance Comparison Chart'></div>

    ----
    **Problem :** {PSB_BLOCKS[2]['problem']}  
    **Solution :** {PSB_BLOCKS[2]['solution']}  
    **Benefit :** {PSB_BLOCKS[2]['benefit']}

    ### Implementation Timeline
    Our implementation follows North Dakota's "Be Legendary" commitment to excellence and reliable delivery:

    <div align='center'><img src='charts/rmf_timeline.png' width='80%' alt='RMF Implementation Timeline'></div>

    | Phase | Timeline | Key Activities | Deliverables |
    |-------|----------|----------------|--------------|
    | Planning | Q3 FY25 | Requirements Analysis, Architecture Design | System Security Plan, Architecture Diagrams |
    | Development | Q4 FY25 | Platform Building, Controls Implementation | Working Platform, Controls Evidence |
    | Testing | Q1 FY26 | Security Testing, Validation | Test Results, Remediation Plan |
    | Deployment | Q2 FY26 | Production Rollout, Authorization Package | Live System, ATO Documentation |
    | Operations | Q3 FY26+ | Continuous Monitoring, Improvement | Compliance Reports, Security Metrics |

    ----
    <div align="center">
      <p><strong>True North Insights</strong> · Veteran-Owned Small Business · North Dakota Proud · CAGE: 8NEX1</p>
      <p><strong>Contact:</strong> {CONTACT} · <strong>Website:</strong> www.truenorthinsights.com</p>
      <p><em>Hoorah! Bringing legendary commitment to your security mission.</em></p>
    </div>
    """)
    return ascii_only(md).strip()

# ---------- build implementation guide markdown -------------------
def build_implementation_guide_markdown() -> str:
    today = datetime.date.today()
    
    md = f"# {SYSTEM} — RMF Implementation Guide\n\n"
    md += dedent(f"""
    <div align="center">
      <p><strong>🇺🇸 Detailed Implementation Instructions · Legendary Precision 🇺🇸</strong></p>
    </div>

    *Organization :* **{ORG}**  
    *Date :* {today}  
    *Version :* 1.0

    ----
    ## Introduction

    This guide provides detailed instructions for implementing the Risk Management Framework (RMF) using True North's 
    methodology, which combines military precision with North Dakota's legendary commitment to excellence. This document
    supplements the RMF Quick Start guide and provides step-by-step instructions for each phase of the RMF process.

    ### How to Use This Guide

    1. Start by reviewing the RMF Quick Start document for an overview of the process
    2. Follow the detailed instructions in this guide for each RMF step
    3. Use the provided templates and checklists to ensure comprehensive implementation
    4. Contact True North's support team with any questions

    ## RMF Implementation Steps
    """)

    # Add detailed implementation steps for each RMF phase
    for step, tasks in RMF_IMPLEMENTATION_TIPS.items():
        md += f"\n### {step} Phase\n\n"
        md += f"The {step} phase establishes the foundation for the following activities and deliverables:\n\n"
        md += "\n".join(f"- {task}" for task in tasks)
        md += "\n\n**Key Documentation:**\n\n"
        
        if step == "Prepare":
            md += "- System Boundary Diagram\n- SCRM Policy Document\n- Roles & Responsibilities Matrix\n- SAFe Program Increment Plan\n"
        elif step == "Categorize":
            md += "- FIPS 199 Categorization Worksheet\n- Information Types Register\n- Privacy Impact Assessment\n- Data Flow Diagrams\n"
        elif step == "Select":
            md += "- Control Selection Workbook\n- Tailoring Justification Memo\n- Inheritance and Hybrid Control Documentation\n- Control Implementation Statement Templates\n"
        elif step == "Implement":
            md += "- System Security Plan (SSP)\n- Configuration Management Plan\n- Automated Testing Scripts\n- IaC Templates\n- CI/CD Pipeline Documentation\n"
        elif step == "Assess":
            md += "- Security Assessment Plan (SAP)\n- Testing Procedures\n- Assessment Scripts and Tools\n- Evidence Collection Templates\n- Findings Register\n"
        elif step == "Authorize":
            md += "- Security Assessment Report (SAR)\n- Plan of Action & Milestones (POA&M)\n- Risk Assessment Report\n- ATO Request Letter\n- Executive Summary for AO\n"
        elif step == "Monitor":
            md += "- Continuous Monitoring Strategy\n- Automated Scanning Configuration\n- Metric Dashboards Setup\n- POA&M Management Process\n- Incident Response Integration\n"
    
    md += dedent("""
    ----
    ## True North's RMF Accelerators

    True North Insights offers several accelerators that can speed your RMF implementation:

    ### 1. Control Implementation Statements Library

    Our pre-written control implementation statements cover the complete FedRAMP Moderate baseline.
    Each statement is:
    - Written in clear, assessor-friendly language
    - Technically accurate and implementation-neutral
    - Designed for easy customization to your environment

    ### 2. Document Templates

    - System Security Plan (SSP) Template with OSCAL export capability
    - Privacy Threshold Analysis (PTA) and Privacy Impact Assessment (PIA)
    - Incident Response Plan with tabletop exercise scenarios
    - Contingency Plan template with BIA worksheet

    ### 3. Automation Tools

    - GitLab CI/CD Templates for control validation
    - Docker-based scanning tools pre-configured for FedRAMP requirements
    - Terraform modules for compliant infrastructure
    - Python scripts for generating OSCAL JSON evidence

    ### 4. Assessment Tools

    - Control testing procedures mapped to NIST SP 800-53A
    - Evidence collection checklist by control family
    - POA&M tracking system with risk scoring
    - RMF readiness assessment toolkit

    ----
    ## Common Pitfalls and How to Avoid Them

    ### Scope Creep
    **Problem:** System boundaries expand during implementation, invalidating security documentation.  
    **Solution:** Document and control boundaries clearly at the start; use configuration management to track changes.

    ### Insufficient Evidence
    **Problem:** Controls are implemented but evidence is inadequate for assessment.  
    **Solution:** Design evidence collection into implementation; use True North's evidence matrix to ensure completeness.

    ### Control Conflicts
    **Problem:** Some security controls conflict with operational requirements.  
    **Solution:** Identify conflicts early and document risk-based decisions for alternative implementations.

    ### Policy-Practice Gap
    **Problem:** Written policies don't match actual practices.  
    **Solution:** Develop policies based on implementable practices; update both in tandem.

    ----
    ## Additional Resources

    - NIST SP 800-37 Rev 2: [https://csrc.nist.gov/publications/detail/sp/800-37/rev-2/final](https://csrc.nist.gov/publications/detail/sp/800-37/rev-2/final)
    - FedRAMP Documentation: [https://www.fedramp.gov/documents/](https://www.fedramp.gov/documents/)
    - OSCAL Resources: [https://pages.nist.gov/OSCAL/](https://pages.nist.gov/OSCAL/)
    - True North Knowledge Base: [https://truenorthinsights.com/kb](https://truenorthinsights.com/kb)
    """)
    
    md += dedent(f"""
    ----
    <div align="center">
      <p><strong>True North Insights</strong> · Veteran-Owned Small Business · CAGE: 8NEX1</p>
      <p><strong>Contact:</strong> {CONTACT} · <strong>Website:</strong> www.truenorthinsights.com</p>
      <p><em>Hoorah! Bringing legendary commitment to your security mission from America's heartland.</em></p>
    </div>
    """)
    return ascii_only(md).strip()

# ---------- main ---------------------------------------------------
def main():
    print_header("True North Insights - RMF Documentation Generator")
    
    out_dir = Path("rmf") 
    create_directory(out_dir)
    
    # Generate Quick Start guide
    quick_start_file = out_dir / "rmf_quick_start.md"
    quick_start_file.write_text(build_quick_start_markdown(), encoding="utf-8")
    print_success(f"Enhanced RMF Quick Start created at {quick_start_file}")
    
    # Generate Implementation Guide
    impl_guide_file = out_dir / "rmf_implementation_guide.md"
    impl_guide_file.write_text(build_implementation_guide_markdown(), encoding="utf-8")
    print_success(f"RMF Implementation Guide created at {impl_guide_file}")
    
    print_header("RMF Documentation Generation Complete", char="-")
    print("To convert to PDF, run: python export_to_pdf.py rmf/*.md")

if __name__ == "__main__":
    main()

