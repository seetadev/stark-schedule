import path from "path";
// import legacy from "@vitejs/plugin-legacy"; // Remove this line
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react(), legacy()], // Remove legacy() from here
  plugins: [react()], // Keep only react() or other necessary plugins
  // test: {
  //   globals: true,
  //   environment: "jsdom",
  //   setupFiles: "./src/setupTests.ts",
  // },

  esbuild: {
    target: "esnext",
  },
  build: {
    target: "esnext",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
