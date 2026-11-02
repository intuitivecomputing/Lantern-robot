#!/usr/bin/env bash
# Builds the site for GitHub Pages into dist/, served at
# https://intuitivecomputing.github.io/Lantern-robot/.
# Run by .github/workflows/pages.yml on every push to main. Run it locally
# (npm run build:pages) to check the output before pushing.
set -euo pipefail

BASE="/Lantern-robot/"
OUT="dist"

cd "$(dirname "$0")/.."

npm run build -- --base="$BASE"

# The site is a single-page app and GitHub Pages has no rewrites, so each
# route gets its own copy of the page. 404.html catches everything else;
# the app reads the URL, so aliases such as /bom still land on the page.
cp "$OUT/index.html" "$OUT/build-guide.html"
cp "$OUT/index.html" "$OUT/bill-of-materials.html"
cp "$OUT/index.html" "$OUT/404.html"

echo "GitHub Pages site written to $OUT/"
