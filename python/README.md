# True North Insights · Five‑Year Capability & Growth Blueprint

<div align="center">
  <img src="charts/tni_banner.png" alt="True North Insights - Veteran-Led Technology Solutions" width="100%"/>
  <h3>🇺🇸 Veteran-Owned • American-Made • Mission-Focused 🇺🇸</h3>
</div>

This repository contains True North Insights' comprehensive business planning and compliance toolkit - delivering military-grade precision to government technology.

| File | Purpose |
| ---- | ------- |
| `business‑plan.md` | Long‑form, image‑rich plan (generated automatically—**don't edit by hand**). |
| `business‑plan.py` | Python script that regenerates the plan plus all charts. Tweak inputs here. |
| `rmf/rmf_quick_start.md` | Risk Management Framework (RMF) quick reference with FedRAMP 20x ready compliance. |
| `README.md` | Quick overview, how‑to‑run steps, and editing tips. |
| `charts/*.png` | Auto‑generated images embedded in the markdown. |

## Core Values

- **INTEGRITY**: Unwavering commitment to truth and ethical standards
- **EXCELLENCE**: Military-grade precision in every deliverable
- **SERVICE**: Putting mission and country first
- **INNOVATION**: American ingenuity solving complex challenges

## Quick Start

```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\\Scripts\\activate
pip install matplotlib markdown pdfkit pandocfilters pillow numpy seaborn
python business_plan.py
python generate_rmf.py
python export_to_pdf.py
```

## Visual Standards

All True North Insights documents follow our patriotic design system:
- **Color Palette**: Navy Blue (#002868), Old Glory Red (#BF0A30), White (#FFFFFF)
- **Typography**: Clear, accessible fonts with military precision
- **Imagery**: American iconography, shield elements, and tactical displays
- **Voice**: Direct, trustworthy, emphasizing security and excellence

## Contact

For more information about True North Insights, contact us at info@truenorthinsights.com

# True North Insights - Document Generation Tools

This directory contains Python tools for generating professional business documentation with True North's distinctive patriotic styling and legendary commitment to excellence.

## Tools Overview

| Script | Purpose |
|--------|---------|
| `business_plan.py` | Generates a comprehensive 5-year business plan with charts |
| `generate_rmf.py` | Creates RMF documentation including a quick start guide and implementation guide |
| `export_to_pdf.py` | Converts markdown files to professionally styled PDFs |
| `cleanup.py` | Removes generated files to restore the repository to its original state |
| `true_north_common.py` | Shared utilities used by all tools |
| `run_all.py` | Executes all document generation tools in sequence |

## Requirements

- Python 3.8 or later
- Dependencies:
  - Matplotlib
  - Pandas
  - NumPy
  - Pillow (PIL)
  - pdfkit
- External tools:
  - Pandoc - for Markdown to HTML conversion
  - wkhtmltopdf - for HTML to PDF conversion

## Installation

1. Install Python dependencies:
   ```bash
   pip install matplotlib pandas numpy pillow pdfkit
   ```

2. Install external tools:
   - Pandoc: [https://pandoc.org/installing.html](https://pandoc.org/installing.html)
   - wkhtmltopdf: [https://wkhtmltopdf.org/downloads.html](https://wkhtmltopdf.org/downloads.html)

## Usage

### Generate All Documents

```bash
python run_all.py
```
This will run all document generation tools in sequence and create all outputs.

### Generate Business Plan

```bash
python business_plan.py
```
This will create:
- `charts/` directory with various visualization charts
- `business_plan.md` with the complete business plan

### Generate RMF Documentation

```bash
python generate_rmf.py
```
This will create:
- `rmf/charts/` directory with RMF-related charts
- `rmf/rmf_quick_start.md` - Quick start guide for RMF implementation
- `rmf/rmf_implementation_guide.md` - Detailed RMF implementation guide

### Convert Markdown to PDF

```bash
python export_to_pdf.py [file or directory paths]
```

Examples:
```bash
# Convert business plan to PDF
python export_to_pdf.py business_plan.md

# Convert all RMF documentation to PDF
python export_to_pdf.py rmf/*.md

# Convert all markdown files in the current directory
python export_to_pdf.py
```

### Clean Up Generated Files

```bash
python cleanup.py
```
This will remove all generated files (charts, markdown, PDFs) while preserving the original Python scripts.

## Styling and Branding

The tools maintain consistent styling that reflects True North's brand identity:
- Patriotic color scheme (navy, red, gold)
- Military-inspired precision and formatting
- "Be Legendary" commitment theme
- Professional formatting optimized for presentation

## Output Examples

### Business Plan
The business plan includes sections covering:
- Executive summary
- Core competencies
- Roadmap
- Service portfolio
- Financial projections
- Veteran leadership advantage
- Implementation timeline

### RMF Documentation
The RMF documentation includes:
- System overview
- Control implementation approach
- Compliance comparison
- Implementation timeline
- Detailed implementation guidance

## License

Copyright © 2023-2024 True North Insights, LLC. All rights reserved.
