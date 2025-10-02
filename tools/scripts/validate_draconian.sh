#!/bin/bash
set -e

# Navigate to the correct subdirectory
cd "$(dirname "$0")/../true-north-insights"

# Run the validation steps
echo "--- Flushing temporary files ---"
npm run flush

echo "--- Running draconian linting ---"
npm run lint:draconian

echo "--- Running draconian tests ---"
npm run test:draconian

echo "--- Draconian validation complete ---"
