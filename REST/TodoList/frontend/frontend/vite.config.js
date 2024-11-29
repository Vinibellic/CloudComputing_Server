import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'frontend',
  publicDir: 'frontend/public',
  server: {
    proxy: {
      '/api': 'http://localhost:2000', // Proxy for API requests
    },
  },
  build: {
    outDir: 'frontend/build',
  },
});