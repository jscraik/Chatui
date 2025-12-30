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
      allow: [path.resolve(__dirname, "../..")],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("@chatui/ui")) {
              if (id.includes("/dist/")) {
                if (id.includes("/chat.")) return "chatui-chat";
                if (id.includes("/settings.") || id.includes("/account-") || id.includes("/SettingRow-") || id.includes("/DiscoverySettingsModal")) {
                  return "chatui-settings";
                }
              if (id.includes("/forms.") || id.includes("/form-") || id.includes("/range-slider")) {
                return "chatui-forms";
              }
              if (id.includes("/layout.") || id.includes("/tabs-")) {
                return "chatui-navigation";
              }
              if (id.includes("/progress-") || id.includes("/chart-")) {
                return "chatui-data";
              }
              if (id.includes("/button-") || id.includes("/icon-button") || id.includes("/card-")) {
                return "chatui-base";
              }
              if (id.includes("/utils-")) return "chatui-utils";
              if (id.includes("/templates.")) return "chatui-templates";
              if (id.includes("/showcase.")) return "chatui-showcase";
              if (id.includes("/dev.")) return "chatui-dev";
              return "chatui-core";
            }
            return "chatui-core";
          }
          if (id.includes("@chatui/tokens") || id.includes("/packages/tokens/")) {
            return "chatui-tokens";
          }
          if (id.includes("node_modules")) {
            if (id.includes("react-dom") || id.includes("react")) {
              return "react";
            }
            if (id.includes("@radix-ui")) {
              return "radix";
            }
            if (id.includes("lucide-react")) {
              return "icons";
            }
            if (id.includes("@openai")) {
              return "openai";
            }
            if (id.includes("lodash")) {
              return "lodash";
            }
            return "vendor";
          }
          if (id.includes("/packages/ui/dist/")) {
            if (id.includes("/chat.")) return "chatui-chat";
            if (id.includes("/settings.") || id.includes("/account-") || id.includes("/SettingRow-") || id.includes("/DiscoverySettingsModal")) {
              return "chatui-settings";
            }
            if (id.includes("/forms.") || id.includes("/form-") || id.includes("/range-slider")) {
              return "chatui-forms";
            }
            if (id.includes("/layout.") || id.includes("/tabs-")) {
              return "chatui-navigation";
            }
            if (id.includes("/progress-") || id.includes("/chart-")) {
              return "chatui-data";
            }
            if (id.includes("/button-") || id.includes("/icon-button") || id.includes("/card-")) {
              return "chatui-base";
            }
            if (id.includes("/utils-")) return "chatui-utils";
            if (id.includes("/templates.")) return "chatui-templates";
            if (id.includes("/showcase.")) return "chatui-showcase";
            if (id.includes("/dev.")) return "chatui-dev";
            return "chatui-core";
          }
          return undefined;
        },
      },
    },
  },
});
