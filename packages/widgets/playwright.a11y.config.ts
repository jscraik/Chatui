import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "@playwright/test";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  testDir: path.join(__dirname, "tests"),
  timeout: 60_000,
  expect: { timeout: 15_000 },
  fullyParallel: true,
  use: {
    baseURL: "http://localhost:5173",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "pnpm dev -- --port 5173 --strictPort",
    url: "http://localhost:5173/src/chat-view/index.html",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    cwd: path.join(__dirname),
  },
});
