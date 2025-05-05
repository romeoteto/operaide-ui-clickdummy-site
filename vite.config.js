import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ghPages } from 'vite-plugin-gh-pages';

// https://vite.dev/config/
export default defineConfig({
  base: '/operaide-ui-clickdummy/',
  plugins: [react(), ghPages()],
  server: {
    host: "0.0.0.0", // 👈 This is the key part
  },
});
