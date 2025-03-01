# A11y Project

An accessibility-focused React application with components like BookingForm, DatePicker, Select, and ThemeToggle.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploying to GitHub Pages

This project includes several options for deploying to GitHub Pages:

### Option 1: Using the pre-built static files in the `gh-pages` directory

The `gh-pages` directory contains pre-built static files ready for deployment. See the README.md file in that directory for detailed instructions on how to use these files.

### Option 2: Using the deployment script

Run the deployment script to build the project and prepare the files for GitHub Pages:

```bash
./deploy-gh-pages.sh
```

Follow the instructions provided by the script to complete the deployment.

### Option 3: Using GitHub Actions (Recommended)

This project includes a GitHub Actions workflow file (`.github/workflows/deploy-gh-pages.yml`) that automates the build and deployment process.

To use this option:

1. Push your code to GitHub
2. Go to your repository settings
3. Navigate to "Pages"
4. Under "Build and deployment", select "GitHub Actions" as the source
5. The site will be automatically built and deployed when you push to the main branch

## Project Structure

- `src/`: Source code
  - `components/`: React components
  - `contexts/`: React contexts
  - `styles/`: CSS styles
- `public/`: Static assets
- `tests/`: Playwright tests
