#!/usr/bin/env python
"""
cleanup.py - Removes all generated files while preserving original Python scripts.
Cleans up charts, PDFs, HTML files, and temporary assets to restore the repository
to its original state.
"""

import shutil
from pathlib import Path
import sys
from true_north_common import create_directory, print_header, print_success, print_error

def delete_path(path):
    """Delete a file or directory with proper error handling"""
    try:
        if path.is_dir():
            shutil.rmtree(path)
            print(f"[DELETED] Directory: {path}")
        else:
            path.unlink()
            print(f"[DELETED] File: {path}")
        return True
    except Exception as e:
        print_error(f"Failed to delete {path}: {e}")
        return False

def main():
    # Get base directory
    base_dir = Path(__file__).parent
    print_header("True North Insights - Cleanup Script")
    print("This script will remove all generated files but keep original Python scripts.")
    
    # If --confirm is not provided, ask for confirmation
    if "--confirm" not in sys.argv:
        response = input("Are you sure you want to proceed? [y/N]: ")
        if response.lower() not in ['y', 'yes']:
            print("Cleanup aborted.")
            return

    # Counter for tracking operations
    deleted_count = 0
    
    # 1. Delete generated charts directories
    charts_dirs = [
        base_dir / "charts",
        base_dir / "rmf" / "charts"
    ]
    for chart_dir in charts_dirs:
        if chart_dir.exists():
            deleted_count += delete_path(chart_dir)
    
    # 2. Delete generated markdown files
    md_files = [
        base_dir / "business_plan.md",
        base_dir / "rmf" / "rmf_quick_start.md",
        base_dir / "rmf" / "rmf_implementation_guide.md"
    ]
    for md_file in md_files:
        if md_file.exists():
            deleted_count += delete_path(md_file)
    
    # 3. Delete all PDF and HTML files
    for file_ext in ['.pdf', '.html']:
        for file_path in base_dir.glob(f"**/*{file_ext}"):
            deleted_count += delete_path(file_path)
    
    # 4. Delete temporary assets directory
    pdf_assets = base_dir / "pdf_assets"
    if pdf_assets.exists():
        deleted_count += delete_path(pdf_assets)
    
    # 5. Create clean charts directories to avoid errors when running scripts
    for chart_dir in charts_dirs:
        create_directory(chart_dir, quiet=True)
        print(f"[CREATED] Empty directory: {chart_dir}")
    
    # 6. Create empty rmf directory if needed
    rmf_dir = base_dir / "rmf"
    if not rmf_dir.exists():
        create_directory(rmf_dir, quiet=True)
        print(f"[CREATED] Empty directory: {rmf_dir}")
    
    print_header(f"Cleanup Complete - Removed {deleted_count} items", char="-")
    print_success("The repository has been restored to its original state.")
    print_success("Original Python scripts have been preserved.")
    print("\nTo regenerate all files, run:")
    print("  python generate_rmf.py")
    print("  python business_plan.py")
    print("  python export_to_pdf.py rmf/*.md business_plan.md")

if __name__ == "__main__":
    main()
