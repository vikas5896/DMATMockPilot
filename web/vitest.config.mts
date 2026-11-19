import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // keep the test cache out of the project, so test runs don't make the Next.js dev server re-scan files
  cacheDir: join(tmpdir(), "mockpilot-vitest"),
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
});
