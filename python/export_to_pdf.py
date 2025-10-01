#!/usr/bin/env python
"""
export_to_pdf.py – convert every *.md to *.pdf via Pandoc + wkhtmltopdf.
Creates vibrant, patriotic-themed PDFs with professional styling and branding
that embodies legendary commitment.
"""

import sys, subprocess, shutil, pdfkit, re
from pathlib import Path
from datetime import datetime
from true_north_common import (
    TNI_COLORS, check_dependency, create_directory, 
    print_header, print_success, print_error
)

def create_html_assets():
    """Create header and footer HTML files for PDF generation"""
    assets_dir = create_directory("pdf_assets", quiet=True)
    
    # Create header HTML with improved vertical spacing and alignment
    header_html = f"""<!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
            }}
            .header {{
                width: 100%;
                height: 70px; /* Increased height for better spacing */
                background: linear-gradient(to right, {TNI_COLORS['red']}, {TNI_COLORS['white']}, {TNI_COLORS['navy']});
                color: white;
                text-align: center;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 30px; /* Increased horizontal padding */
                box-sizing: border-box;
                border-bottom: 3px solid {TNI_COLORS['gold']};
            }}
            .logo-container {{
                display: flex;
                align-items: center;
                height: 100%;
                padding-top: 5px; /* Even padding on top */
                padding-bottom: 5px; /* Even padding on bottom */
            }}
            .logo {{
                font-weight: bold;
                font-size: 18px;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
                color: {TNI_COLORS['gold']};
            }}
            .nd-badge {{
                font-size: 10px;
                color: {TNI_COLORS['white']};
                background-color: {TNI_COLORS['nd_blue']};
                padding: 2px 5px;
                border-radius: 3px;
                margin-left: 10px;
                text-transform: uppercase;
            }}
            .stars-container {{
                display: flex;
                flex-direction: column;
                justify-content: center;
                height: 100%;
                padding-top: 5px; /* Even padding on top */
                padding-bottom: 5px; /* Even padding on bottom */
            }}
            .stars {{
                display: flex;
                align-items: center;
                justify-content: center;
            }}
            .star {{
                color: {TNI_COLORS['gold']};
                font-size: 14px;
                margin: 0 3px;
            }}
            .date-container {{
                display: flex;
                flex-direction: column;
                justify-content: center;
                height: 100%;
                padding-top: 5px; /* Even padding on top */
                padding-bottom: 5px; /* Even padding on bottom */
            }}
            .date {{
                font-size: 12px;
                color: white;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
                margin-bottom: 4px;
            }}
            .motto {{
                font-style: italic;
                font-size: 10px;
                color: {TNI_COLORS['white']};
            }}
        </style>
    </head>
    <body>
        <div class="header">
            <div class="logo-container">
                <div class="logo">TRUE NORTH INSIGHTS</div>
                <div class="nd-badge">Be Legendary</div>
            </div>
            <div class="stars-container">
                <div class="stars">
                    <div class="star">&#9733;</div>
                    <div class="star">&#9733;</div>
                    <div class="star">&#9733;</div>
                </div>
            </div>
            <div class="date-container">
                <div class="date">{datetime.now().strftime("%Y-%m-%d")}</div>
                <div class="motto">American Excellence</div>
            </div>
        </div>
    </body>
    </html>
    """
    
    # Create footer HTML with enhanced styling
    footer_html = f"""<!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
            }}
            .footer {{
                width: 100%;
                height: 45px; /* Slightly increased height */
                background: {TNI_COLORS['navy']};
                color: white;
                text-align: center;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 25px; /* Slightly increased padding */
                box-sizing: border-box;
                font-size: 10px;
                border-top: 2px solid {TNI_COLORS['gold']};
            }}
            .page-num {{
                color: {TNI_COLORS['gold']};
                font-weight: bold;
            }}
            .tagline {{
                font-style: italic;
            }}
            .veteran-badge {{
                background-color: {TNI_COLORS['army_green']};
                padding: 2px 6px;
                border-radius: 3px;
                font-size: 9px;
                font-weight: bold;
            }}
        </style>
    </head>
    <body>
        <div class="footer">
            <div><span class="veteran-badge">Veteran-Owned</span> Small Business</div>
            <div class="page-num">Page <span class="page"></span> of <span class="topage"></span></div>
            <div class="tagline">Hoorah! Securing America with Legendary Commitment</div>
        </div>
    </body>
    </html>
    """
    
    # Write files with explicit UTF-8 encoding
    header_path = assets_dir / "header.html"
    footer_path = assets_dir / "footer.html"
    
    with open(header_path, 'w', encoding='utf-8') as f:
        f.write(header_html)
        
    with open(footer_path, 'w', encoding='utf-8') as f:
        f.write(footer_html)
    
    return header_path, footer_path

def create_css():
    """Create a CSS file for enhanced styling"""
    assets_dir = create_directory("pdf_assets", quiet=True)
    css_path = assets_dir / "tni-style.css"
    
    css_content = f"""
    /* Base typography and layout */
    body {{
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        margin: 40px 0;
        padding: 0 25px;
        background-color: #fff;
    }}
    
    /* Improved headings with consistent styling */
    h1, h2, h3, h4, h5, h6 {{
        color: {TNI_COLORS['navy']};
        font-weight: bold;
        margin-top: 25px;
        margin-bottom: 15px;
        letter-spacing: -0.01em;
    }}
    
    h1 {{
        text-align: center;
        font-size: 28px;
        border-bottom: 3px solid {TNI_COLORS['red']};
        padding-bottom: 15px;
        margin-bottom: 30px;
        margin-top: 40px;
        letter-spacing: 0.01em;
        text-transform: uppercase;
    }}
    
    h2 {{
        font-size: 22px;
        border-left: 5px solid {TNI_COLORS['navy']};
        padding-left: 12px;
        margin-top: 35px;
        padding-top: 3px;
        padding-bottom: 3px;
        background-color: #f9f9f9;
    }}
    
    h2::after {{
        content: "";
        display: block;
        width: 50px;
        height: 3px;
        background-color: {TNI_COLORS['gold']};
        margin-top: 8px;
    }}
    
    h3 {{
        color: {TNI_COLORS['nd_blue']};
        font-size: 18px;
        margin-top: 25px;
        border-bottom: 1px dotted #ccc;
        padding-bottom: 5px;
    }}
    
    /* Improved table styling */
    table {{
        width: 100%;
        border-collapse: collapse;
        margin: 25px 0;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        font-size: 0.95em;
    }}
    
    th {{
        background-color: {TNI_COLORS['navy']};
        color: white;
        text-align: left;
        padding: 12px;
        border-bottom: 2px solid {TNI_COLORS['gold']};
        font-weight: bold;
    }}
    
    td {{
        border: 1px solid #ddd;
        padding: 12px;
    }}
    
    tr:nth-child(even) {{
        background-color: #f9f9f9;
    }}
    
    tr:hover {{
        background-color: #f1f1f1;
    }}
    
    /* Links styling */
    a {{
        color: {TNI_COLORS['nd_blue']};
        text-decoration: none;
        border-bottom: 1px dotted {TNI_COLORS['nd_blue']};
        transition: color 0.2s, border-color 0.2s;
    }}
    
    a:hover {{
        color: {TNI_COLORS['red']};
        border-color: {TNI_COLORS['red']};
    }}
    
    /* Enhanced image styling */
    img {{
        max-width: 100%;
        height: auto;
        display: block;
        margin: 25px auto;
        border: 1px solid #e0e0e0;
        box-shadow: 0 3px 10px rgba(0,0,0,0.15);
        border-radius: 2px;
    }}
    
    /* Code blocks styling */
    code, pre {{
        background-color: #f5f5f5;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 2px 4px;
        font-family: Consolas, Monaco, 'Andale Mono', monospace;
        font-size: 0.9em;
    }}
    
    pre {{
        padding: 15px;
        overflow-x: auto;
        border-left: 3px solid {TNI_COLORS['gold']};
        margin: 20px 0;
    }}
    
    /* Blockquote styling */
    blockquote {{
        border-left: 4px solid {TNI_COLORS['red']};
        margin-left: 0;
        padding: 12px 20px;
        font-style: italic;
        background-color: #f9f9f9;
        margin: 20px 0;
        color: #444;
    }}
    
    blockquote p:last-child {{
        margin-bottom: 0;
    }}
    
    /* Emphasis styling */
    strong {{
        color: {TNI_COLORS['navy']};
    }}
    
    em {{
        color: {TNI_COLORS['nd_blue']};
    }}
    
    /* Horizontal rule styling */
    hr {{
        border: none;
        height: 3px;
        background: linear-gradient(to right, {TNI_COLORS['red']}, {TNI_COLORS['white']}, {TNI_COLORS['navy']});
        margin: 35px 0;
    }}
    
    /* Page break control */
    .page-break {{
        page-break-after: always;
    }}
    
    /* Lists styling */
    ul, ol {{
        padding-left: 25px;
    }}
    
    li {{
        margin-bottom: 5px;
    }}
    
    /* Business plan specific enhancements */
    .executive-summary {{
        background-color: #f9f9fe;
        padding: 20px;
        border-left: 5px solid {TNI_COLORS['navy']};
        margin: 20px 0;
    }}
    
    .psb-box {{
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 15px;
        margin: 20px 0;
        background-color: #fcfcfc;
    }}
    
    .problem {{
        color: {TNI_COLORS['red']};
        font-weight: bold;
    }}
    
    .solution {{
        color: {TNI_COLORS['navy']};
        font-weight: bold;
    }}
    
    .benefit {{
        color: {TNI_COLORS['nd_blue']};
        font-weight: bold;
    }}
    
    /* "Be Legendary" styling elements */
    .nd-callout {{
        background-color: #f5f9ff;
        border-left: 4px solid {TNI_COLORS['nd_blue']};
        padding: 18px;
        margin: 25px 0;
        position: relative;
        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    }}
    
    .nd-callout::after {{
        content: "BE LEGENDARY";
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 10px;
        color: {TNI_COLORS['nd_blue']};
        font-style: italic;
        font-weight: bold;
    }}
    
    /* Patriotic highlights */
    h2 strong, h3 strong {{
        color: {TNI_COLORS['red']};
    }}
    
    /* Veteran emphasis */
    .veteran-note {{
        background-color: #f1f5ed;
        border: 1px solid {TNI_COLORS['army_green']};
        padding: 15px;
        margin: 20px 0;
        border-radius: 4px;
        position: relative;
        padding-top: 25px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    }}
    
    .veteran-note::before {{
        content: "VETERAN INSIGHT";
        position: absolute;
        top: -10px;
        left: 10px;
        background-color: {TNI_COLORS['army_green']};
        color: white;
        padding: 3px 12px;
        font-size: 10px;
        font-weight: bold;
        border-radius: 3px;
    }}
    
    /* Two-column layout for business plan */
    .two-columns {{
        column-count: 2;
        column-gap: 30px;
        margin: 20px 0;
    }}
    
    /* Image captions */
    .caption {{
        text-align: center;
        font-size: 0.9em;
        color: {TNI_COLORS['dark_gray']};
        margin-top: -15px;
        margin-bottom: 20px;
        font-style: italic;
    }}
    
    /* KPI/Metrics styling */
    .metric-highlight {{
        font-size: 1.2em;
        color: {TNI_COLORS['red']};
        font-weight: bold;
    }}
    
    /* Special section for business plan */
    .business-section {{
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 20px;
        margin: 30px 0;
    }}
    
    .business-section h3 {{
        margin-top: 0;
        color: {TNI_COLORS['navy']};
        border-bottom: 2px solid {TNI_COLORS['gold']};
        padding-bottom: 10px;
    }}
    
    /* Centered content */
    .center {{
        text-align: center;
    }}
    
    /* Adjust paragraph spacing */
    p {{
        margin-bottom: 15px;
    }}
    
    /* Footer alignment */
    .footer-content {{
        text-align: center;
        margin-top: 40px;
        border-top: 1px solid #ddd;
        padding-top: 20px;
        color: {TNI_COLORS['dark_gray']};
        font-size: 0.9em;
    }}
    """
    
    css_path.write_text(css_content)
    return css_path

def md_to_html(md: Path) -> Path:
    """Convert a markdown file to HTML using pandoc with styling"""
    html = md.with_suffix(".html")
    css_path = create_css()
    
    # Extract title for better HTML formatting
    title = "True North Insights"
    with open(md, 'r', encoding='utf-8') as f:
        content = f.read()
        match = re.search(r'^# (.*?)$', content, re.MULTILINE)
        if match:
            title = match.group(1)
    
    # Use pandoc with title and CSS
    cmd = [
        "pandoc", str(md), 
        "--standalone",
        "--metadata", f"title={title}",
        "--css", str(css_path),
        "-o", str(html)
    ]
    
    try:
        subprocess.run(cmd, check=True, capture_output=True)
        return html
    except subprocess.CalledProcessError as e:
        print_error(f"Pandoc failed: {e.stderr.decode()}")
        raise

def get_pdf_options(filename):
    """Return appropriate PDF options based on filename"""
    pdf_opts = {
        "enable-local-file-access": None,
        "encoding": "utf-8",
        "margin-top": "80px",
        "margin-bottom": "60px",
        "margin-left": "30px",
        "margin-right": "30px",
        "title": "True North Insights - American Excellence",
        "print-media-type": None,
        "no-background": None
    }
    
    filename_lower = filename.lower()
    
    # Customize options based on file name patterns
    if "business_plan" in filename_lower:
        pdf_opts.update({
            "header-spacing": "10",
            "footer-spacing": "5",
            "page-size": "Letter",
            "outline": None,
            "outline-depth": "3",
            "footer-font-name": "Arial",
            "header-font-name": "Arial",
            "dpi": "300",
            "image-dpi": "300",
            "image-quality": "100"
        })
    elif "rmf" in filename_lower:
        pdf_opts.update({
            "header-spacing": "5",
            "footer-spacing": "5",
            "page-size": "Letter",
            "margin-left": "25px",
            "margin-right": "25px",
            "outline": None,
            "outline-depth": "3"
        })
    elif "implementation" in filename_lower:
        pdf_opts.update({
            "header-spacing": "5",
            "footer-spacing": "5",
            "page-size": "Letter",
            "outline": None,
            "outline-depth": "4",
            "toc": None,
            "toc-header-text": "Table of Contents"
        })
    elif "readme" in filename_lower:
        pdf_opts.update({
            "header-spacing": "5",
            "footer-spacing": "5",
            "margin-left": "35px",
            "margin-right": "35px"
        })
    
    return pdf_opts

def html_to_pdf(html: Path, header_path: Path, footer_path: Path) -> Path:
    """Convert HTML to PDF using wkhtmltopdf with custom styling"""
    pdf = html.with_suffix(".pdf")
    
    # Get appropriate options based on filename
    pdf_opts = get_pdf_options(html.name)
    
    # Add header and footer paths
    pdf_opts["header-html"] = str(header_path)
    pdf_opts["footer-html"] = str(footer_path)
    
    try:
        config = pdfkit.configuration(wkhtmltopdf=get_wkhtmltopdf_path())
        pdfkit.from_file(str(html), str(pdf), configuration=config, options=pdf_opts)
        html.unlink()  # Clean up intermediate HTML file
        return pdf
    except Exception as e:
        print_error(f"PDF generation failed: {e}")
        raise

def get_wkhtmltopdf_path():
    """Get the path to wkhtmltopdf executable"""
    wkhtml = shutil.which("wkhtmltopdf") or str(
        Path(r"C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe"))
    
    if not Path(wkhtml).exists():
        print_error("wkhtmltopdf not found—install it or add to PATH")
        print("[HELP] Download from https://wkhtmltopdf.org/downloads.html")
        sys.exit(1)
    
    return wkhtml

def main():
    print_header("True North Insights PDF Generator")
    
    # Check dependencies
    if not check_dependency("pandoc", "Pandoc", "https://pandoc.org/installing.html"):
        sys.exit(1)
    
    # Get input files
    targets = [Path.cwd(), *[Path(a) for a in sys.argv[1:]]]
    md_files = [p for t in targets for p in t.rglob("*.md")]
    
    if not md_files:
        print("[WARNING] No markdown files found. Usage:")
        print("  python export_to_pdf.py [directory or file paths]")
        sys.exit(0)
    
    print("[INFO] Creating legendary, patriotic documentation with precision")
    print(f"[INFO] Processing {len(md_files)} markdown files...")
    
    # Create assets
    header_path, footer_path = create_html_assets()
    
    # Process each file
    successful = 0
    for md in md_files:
        try:
            print(f"-> Converting {md}")
            html = md_to_html(md)
            pdf_path = html_to_pdf(html, header_path, footer_path)
            print_success(f"Created {pdf_path.relative_to(Path.cwd())}")
            successful += 1
        except Exception as e:
            print_error(f"Failed {md.name}: {e}")
    
    # Print summary
    print_header(f"Conversion Complete: {successful}/{len(md_files)} files processed", char="-")
    print("[USA] True North Insights - Be Legendary in Everything We Do")

if __name__ == "__main__":
    main()
