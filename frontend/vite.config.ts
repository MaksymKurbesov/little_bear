import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import deadFile from "vite-plugin-deadfile";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    deadFile({
      root: ".",
      output: "deadfiles-report.json",
    }),
  ],
});
