import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dos páginas de entrada, como antes: la del público (index.html) y la de taquerías (participa.html).
const page = (name) => fileURLToPath(new URL(name, import.meta.url));

export default defineConfig({
  plugins: [react()],
  // Hostinger: el sitio va en la raíz del dominio (https://feriadeltacoautlan.com/).
  base: '/',
  server: { port: 4173 },
  preview: { port: 4173 },
  build: {
    rollupOptions: {
      input: {
        main: page('./index.html'),
        participa: page('./participa.html'),
        notFound: page('./404.html'),
      },
    },
  },
});
