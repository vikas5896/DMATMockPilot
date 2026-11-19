import "server-only";
import { join } from "node:path";
import type { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";
import * as schema from "./schema";

/**
 * Database connection.
 * - DATABASE_URL set (production, e.g. Neon/Supabase): connects with postgres-js.
 * - Not set (local development): PGlite, a real PostgreSQL running inside the app,
 *   stored in web/data/pglite (git-ignored). No installation or password needed.
 * Migrations in /drizzle are applied automatically on first use.
 */
export type Db = PgDatabase<PgQueryResultHKT, typeof schema>;

const g = globalThis as unknown as { __mpDb?: Promise<Db> };
const MIGRATIONS = join(process.cwd(), "drizzle");

async function connect(): Promise<Db> {
  const url = process.env.DATABASE_URL;
  if (url) {
    const { default: postgres } = await import("postgres");
    const { drizzle } = await import("drizzle-orm/postgres-js");
    const { migrate } = await import("drizzle-orm/postgres-js/migrator");
    const client = postgres(url, { max: 5, prepare: false });
    const db = drizzle(client, { schema });
    await migrate(db, { migrationsFolder: MIGRATIONS });
    return db as unknown as Db;
  }
  const { PGlite } = await import("@electric-sql/pglite");
  const { drizzle } = await import("drizzle-orm/pglite");
  const { migrate } = await import("drizzle-orm/pglite/migrator");
  const client = new PGlite(join(process.cwd(), "data", "pglite"));
  const db = drizzle(client, { schema });
  await migrate(db, { migrationsFolder: MIGRATIONS });
  return db as unknown as Db;
}

/** Shared connection (kept on globalThis so hot reloads in development don't open it twice). */
export function getDb(): Promise<Db> {
  if (!g.__mpDb) {
    g.__mpDb = connect().catch((e) => {
      g.__mpDb = undefined;
      throw e;
    });
  }
  return g.__mpDb;
}

/** True while `next build` prerenders pages: avoid opening the local PGlite file from parallel build workers. */
export const isBuildWithoutDatabase = () =>
  process.env.NEXT_PHASE === "phase-production-build" && !process.env.DATABASE_URL;
