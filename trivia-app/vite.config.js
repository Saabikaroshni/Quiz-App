import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "./", // Ensures correct asset paths
  server: {
    port: 3000, // Optional: Change port if needed
  },
  build: {
    outDir: "dist", // Output directory
  },
  resolve: {
    alias: {
      "@": "/src", // Optional: Shorten imports
    },
  },
});
