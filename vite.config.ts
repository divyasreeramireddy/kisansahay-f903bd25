import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Replace 'your-repo-name' with the actual name of your GitHub repository
const repoName = "/kisansahay-f903bd25/";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: repoName,   // <-- This fixes the blank page on GitHub Pages
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

