#!/bin/bash

# Build the project
npm run build

# Update the gh-pages directory with the latest build
rm -rf gh-pages/*
cp -r dist/* gh-pages/

# Ensure .nojekyll file exists to prevent GitHub from ignoring files that begin with an underscore
touch gh-pages/.nojekyll

echo "Files prepared for GitHub Pages in the gh-pages directory."
echo ""
echo "To deploy to GitHub Pages, you have several options:"
echo ""
echo "Option 1: Using the gh-pages branch"
echo "1. Create a gh-pages branch: git checkout -b gh-pages"
echo "2. Remove all files except the gh-pages directory: git rm -rf . && git checkout HEAD -- gh-pages"
echo "3. Move files from gh-pages to root: mv gh-pages/* . && mv gh-pages/.nojekyll ."
echo "4. Add all files: git add ."
echo "5. Commit changes: git commit -m 'Deploy to GitHub Pages'"
echo "6. Push to GitHub: git push origin gh-pages"
echo "7. Switch back to main branch: git checkout main"
echo ""
echo "Option 2: Using the docs folder"
echo "1. Rename the gh-pages directory to docs: mv gh-pages docs"
echo "2. Add and commit: git add docs && git commit -m 'Add docs for GitHub Pages'"
echo "3. Push to GitHub: git push origin main"
echo "4. Configure GitHub Pages to use the docs folder in repository settings"
echo ""
echo "Option 3: Using GitHub Actions (Recommended)"
echo "1. Push your code to GitHub including the .github/workflows/deploy-gh-pages.yml file"
echo "2. Go to your repository settings"
echo "3. Navigate to Pages"
echo "4. Under Build and deployment, select GitHub Actions as the source"
