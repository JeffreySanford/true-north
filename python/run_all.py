#!/usr/bin/env python
"""
run_all.py - Execute all True North document generation tools in sequence
This script orchestrates the execution of all Python tools for generating
True North's documentation suite with proper error handling.
"""

import subprocess
import sys
from pathlib import Path
from true_north_common import print_header, print_success, print_error

def run_script(script_name):
    """Run a Python script and return success status"""
    print_header(f"Executing {script_name}", char='=', width=36)
    print()
    
    try:
        result = subprocess.run([sys.executable, Path(__file__).parent / script_name], 
                               check=True)
        print_success(f"{script_name} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print_error(f"Error executing {script_name}: {e}")
        return False
    except Exception as e:
        print_error(f"Unexpected error with {script_name}: {e}")
        return False

def main():
    print_header("True North Insights Document Generation Suite", width=56)
    print("\n[INFO] Running with military-grade precision...\n")
    
    # List of scripts to run in sequence
    scripts = [
        "business_plan.py",
        "generate_rmf.py",
        "export_to_pdf.py"
    ]
    
    # Execute each script and track success
    results = {}
    for script in scripts:
        success = run_script(script)
        results[script] = success
    
    # Print summary
    print_header("Document Generation Complete", char='=', width=38)
    print()
    
    # Count successes and failures
    successes = sum(1 for success in results.values() if success)
    failures = len(results) - successes
    
    print(f"[SUMMARY] {successes} scripts succeeded, {failures} scripts failed")
    print(f"[INFO] True North Insights - Veteran-Led Excellence in Digital Security")
    
    # Return non-zero exit code if any script failed
    return 0 if failures == 0 else 1

if __name__ == "__main__":
    sys.exit(main())
