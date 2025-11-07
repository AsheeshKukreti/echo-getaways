import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ==========================================================
// Vite Production Configuration — Echo Getaways
// Ensures smooth routing for SPA + correct base path
// Works for local preview, Netlify, Vercel, or any static host
// ==========================================================

export default defineConfig({
  plugins: [react()],

  // Base path — root for domain deployment
  base: '/',

  // Build options
  build: {
    outDir: 'dist', // default output folder
    sourcemap: false, // disable source maps for smaller build
    chunkSizeWarningLimit: 1000, // avoid warnings on large bundles
  },

  // Dev server config
  server: {
    port: 5173,
    open: true,
    historyApiFallback: true, // enables SPA fallback (very important)
  },

  // Preview mode (used after `npm run build`)
  preview: {
    port: 4173,
    strictPort: true,
    open: true,
    historyApiFallback: true, // ensures routing works from dist preview
  },

  // Optimize deps (optional but helps large React+Tailwind builds)
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'aos'],
  },
});
