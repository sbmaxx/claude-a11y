import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages deployment
  // Change this to '/' if deploying to a custom domain
  // or to the root of a GitHub user page (username.github.io)
  // For project pages (username.github.io/repo-name), use './' or '/repo-name/'
  base: './',
})
