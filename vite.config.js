// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import { ghPages } from 'vite-plugin-gh-pages';

// // https://vite.dev/config/
// export default defineConfig({
//   base: '/operaide-ui-clickdummy/',
//   plugins: [react(), ghPages()],
//   build: {
//     outDir: 'dist',
//     assetsDir: 'assets',
//   },
//   server: {
//     host: "0.0.0.0", // 👈 This is the key part
//   },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ghPages } from 'vite-plugin-gh-pages';

export default defineConfig(({ mode }) => ({
  base: '/operaide-ui-clickdummy-site/',
  plugins: [react(), ghPages()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    host: '0.0.0.0',
  },
  // 👇 hier wird die SPA-Fallbackregel gesetzt
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // Wichtig für GitHub Pages: 404 zu index.html
  // Dies funktioniert nur lokal – für GitHub Pages brauchen wir Schritt 2
}));

