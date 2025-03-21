import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint({
      emitWarning: false, // Suppress warnings during build
      emitError: false, // Suppress errors during build
      failOnError: false, // Do not fail the build on errors
    }),
  ],
  build: {
    target: 'esnext', // Enables top-level await and modern syntax
  },
});
