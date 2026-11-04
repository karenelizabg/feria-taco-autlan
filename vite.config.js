import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dos páginas de entrada, como antes: la del público (index.html) y la de taquerías (participa.html).
const page = (name) => fileURLToPath(new URL(name, import.meta.url));

export default defineConfig({
  plugins: [react()],
  // GitHub Pages sirve el sitio en /feria-taco-autlan/ (project page).
  base: '/feria-taco-autlan/',
  server: { port: 4173 },
  preview: { port: 4173 },
  build: {
    rollupOptions: {
      input: {
        main: page('./index.html'),
        participa: page('./participa.html'),
      },
    },
  },
});
