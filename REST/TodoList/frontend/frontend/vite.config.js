import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/data': 'http://localhost:2000', // Proxy für API-Anfragen
    },
  },
});