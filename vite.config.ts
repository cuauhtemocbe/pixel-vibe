import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  base: './',
  publicDir: "public",
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ['phaser']
        }
      }
    }
  },
  server: {
    host: true,
    port: 5173
  },
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '5173'),
    strictPort: false,
    allowedHosts: 'all'  // Allow all hosts for Railway deployment
  },
  resolve: {
    alias: {
      "@": resolve(fileURLToPath(new URL(".", import.meta.url)), "./src"),
      "@scenes": resolve(fileURLToPath(new URL(".", import.meta.url)), "./src/scenes")
    }
  }
});
