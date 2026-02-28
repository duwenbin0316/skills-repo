import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function getPagesBase() {
  // For GitHub Pages project sites, assets should be served under /<repo>/
  if (process.env.GITHUB_ACTIONS === 'true' && process.env.GITHUB_REPOSITORY) {
    const repo = process.env.GITHUB_REPOSITORY.split('/')[1];
    if (repo) {
      return `/${repo}/`;
    }
  }
  return '/';
}

export default defineConfig({
  plugins: [react()],
  base: getPagesBase(),
});
