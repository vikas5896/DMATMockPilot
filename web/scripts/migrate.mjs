// Applies database migrations (web/drizzle) to DATABASE_URL.
// Runs automatically before `next build` (see package.json), so every deployment updates the tables once.
// Without DATABASE_URL it does nothing: locally the built-in PGlite database migrates itself on first use.
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  console.log("[migrate] DATABASE_URL not set: skipping (local PGlite migrates on first use)");
  process.exit(0);
}

const client = postgres(url, { max: 1, prepare: false, onnotice: () => {} });
try {
  await migrate(drizzle(client), { migrationsFolder: "./drizzle" });
  console.log("[migrate] database is up to date");
} catch (e) {
  console.error("[migrate] failed:", e);
  process.exitCode = 1;
} finally {
  await client.end();
}
