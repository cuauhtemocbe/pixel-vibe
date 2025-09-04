import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  publicDir: "public",
  server: {
    host: true,
    port: 5173
  },
  preview: {
    host: true,
    port: 5173,
    allowedHosts: [
      'pixel-vibe-production.up.railway.app',
      '.up.railway.app',
      'localhost'
    ]
  },
  resolve: {
    alias: {
      "@": resolve(fileURLToPath(new URL(".", import.meta.url)), "./src"),
      "@scenes": resolve(fileURLToPath(new URL(".", import.meta.url)), "./src/scenes")
    }
  }
});
