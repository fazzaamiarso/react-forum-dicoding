import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    include: ["src/**/*.{test,spec}.{ts,js,tsx}"],
    setupFiles: ["src/mocks/msw/server.ts", "src/utils/test-setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
