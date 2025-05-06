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

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ghPages } from "vite-plugin-gh-pages";

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/operaide-ui-clickdummy/' : '/',
  plugins: [react(), ghPages()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    host: '0.0.0.0',
  },
}));
