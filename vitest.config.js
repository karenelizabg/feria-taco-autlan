import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.js';

// Pruebas en el mismo entorno que la app (plugins de Vite y React), con DOM simulado.
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      include: ['src/**/*.test.{js,jsx}'],
      setupFiles: ['src/test/setup.js'],
    },
  })
);
