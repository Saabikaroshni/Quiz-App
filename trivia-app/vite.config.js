import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "/", // Ensure correct base path
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist",
  },
});
