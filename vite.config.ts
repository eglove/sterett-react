import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["lodash", "moment", "react-big-calendar"],
        },
      },
    },
  },
  plugins: [
    react(),
    visualizer({
      brotliSize: true,
      gzipSize: true,
    }),
  ],
});
