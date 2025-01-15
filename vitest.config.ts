import path from "node:path";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      reporter: ["json", "lcov", "html", "text", "json-summary", "text-summary"],
      provider: "istanbul", // or 'v8'01
    },
  },
});
