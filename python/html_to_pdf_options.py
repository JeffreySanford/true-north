#!/usr/bin/env python
"""
html_to_pdf_options.py - Configuration options for PDF generation
Contains specialized settings for different document types to optimize
PDF output quality and appearance.
"""

from true_north_common import TNI_COLORS

# Base PDF options used for all documents
BASE_PDF_OPTIONS = {
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

# Business plan specific options
BUSINESS_PLAN_OPTIONS = {
    **BASE_PDF_OPTIONS,
    "header-spacing": "10",
    "footer-spacing": "5",
    "page-size": "Letter",
    "margin-left": "30px",
    "margin-right": "30px",
    "outline": None,  # Generate PDF bookmarks
    "outline-depth": "3",  # Outline depth to h3
    "footer-font-name": "Arial",
    "header-font-name": "Arial",
    "footer-font-size": "9",
    "enable-smart-shrinking": None,
    "dpi": "300",  # Higher DPI for better quality
    "image-dpi": "300",
    "image-quality": "100"
}

# RMF documentation specific options
RMF_OPTIONS = {
    **BASE_PDF_OPTIONS,
    "header-spacing": "5",
    "footer-spacing": "5",
    "page-size": "Letter",
    "margin-left": "25px",
    "margin-right": "25px",
    "outline": None,
    "outline-depth": "3",
    "footer-font-name": "Arial",
    "header-font-name": "Arial"
}

# Implementation guide specific options
IMPLEMENTATION_GUIDE_OPTIONS = {
    **BASE_PDF_OPTIONS,
    "header-spacing": "5",
    "footer-spacing": "5",
    "page-size": "Letter",
    "outline": None,
    "outline-depth": "4",  # More detailed outline for implementation guides
    "footer-font-name": "Arial",
    "header-font-name": "Arial",
    "cover": None,  # Cover page option - requires a separate HTML file
    "toc": None,  # Generate table of contents
    "toc-header-text": "Table of Contents",
    "toc-level-indentation": "15px"
}

# Default README options
README_OPTIONS = {
    **BASE_PDF_OPTIONS,
    "header-spacing": "5",
    "footer-spacing": "5",
    "page-size": "Letter",
    "margin-left": "35px",
    "margin-right": "35px"  # Wider margins for readability
}

def get_pdf_options(filename):
    """Return appropriate PDF options based on filename"""
    filename_lower = filename.lower()
    
    if "business_plan" in filename_lower:
        return BUSINESS_PLAN_OPTIONS
    elif "implementation" in filename_lower:
        return IMPLEMENTATION_GUIDE_OPTIONS
    elif "rmf" in filename_lower:
        return RMF_OPTIONS
    elif "readme" in filename_lower:
        return README_OPTIONS
    else:
        return BASE_PDF_OPTIONS
