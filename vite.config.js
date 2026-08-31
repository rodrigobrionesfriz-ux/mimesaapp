import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' hace que la app funcione en cualquier subcarpeta de GitHub Pages
// (https://usuario.github.io/mi-mesa/) sin tener que configurar el nombre del repo.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          mammoth: ['mammoth'],
        },
      },
    },
  },
});
