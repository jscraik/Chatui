import path from "path";

import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    fs: {
      // Allow importing workspace packages during dev.
      allow: [path.resolve(__dirname, "../../../..")],
    },
    port: 3001,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("@chatui/ui")) {
            return "chatui-ui";
          }
          if (id.includes("@chatui/tokens")) {
            return "chatui-tokens";
          }
          if (id.includes("node_modules")) {
            if (id.includes("react-dom") || id.includes("react")) {
              return "react";
            }
            if (id.includes("@radix-ui")) {
              return "radix";
            }
            return "vendor";
          }
        },
      },
    },
  },
});
