import "server-only";
import { asc, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { BATCHES as SEED, type Batch } from "@/content/site/batches";
import { getDb, isBuildWithoutDatabase, type Db } from "@/db";
import { batches } from "@/db/schema";

export const BATCHES_TAG = "batches";

export type StoredBatch = Batch & { sort: number; published: boolean };

/** First run: copy the batches from content/site/batches.ts into the database. */
async function ensureSeeded(db: Db) {
  const existing = await db.select({ slug: batches.slug }).from(batches).limit(1);
  if (existing.length) return;
  await db
    .insert(batches)
    .values(SEED.map(({ slug, ...data }, i) => ({ slug, data, sort: i * 10, published: true })))
    .onConflictDoNothing();
}

const toBatch = (row: typeof batches.$inferSelect): StoredBatch => ({
  slug: row.slug,
  ...row.data,
  sort: row.sort,
  published: row.published,
});

/** All batches, for the admin panel (not cached). */
export async function listAllBatches(): Promise<StoredBatch[]> {
  const db = await getDb();
  await ensureSeeded(db);
  const rows = await db.select().from(batches).orderBy(asc(batches.sort), asc(batches.slug));
  return rows.map(toBatch);
}

export async function getStoredBatch(slug: string): Promise<StoredBatch | null> {
  const db = await getDb();
  await ensureSeeded(db);
  const [row] = await db.select().from(batches).where(eq(batches.slug, slug));
  return row ? toBatch(row) : null;
}

/** Published batches for the public website. Cached; refreshed when an admin saves a batch. */
export async function getPublicBatches(): Promise<Batch[]> {
  "use cache";
  cacheTag(BATCHES_TAG);
  cacheLife("hours");
  if (isBuildWithoutDatabase()) return SEED;
  const all = await listAllBatches();
  return all
    .filter((b) => b.published)
    .map((b) => {
      const pub: Batch & Partial<Pick<StoredBatch, "sort" | "published">> = { ...b };
      delete pub.sort;
      delete pub.published;
      return pub;
    });
}

export async function getPublicBatch(slug: string): Promise<Batch | undefined> {
  return (await getPublicBatches()).find((b) => b.slug === slug);
}

export async function saveBatch(b: StoredBatch, originalSlug?: string) {
  const db = await getDb();
  const { slug, sort, published, ...data } = b;
  if (originalSlug && originalSlug !== slug) await db.delete(batches).where(eq(batches.slug, originalSlug));
  await db
    .insert(batches)
    .values({ slug, data, sort, published, updatedAt: new Date() })
    .onConflictDoUpdate({ target: batches.slug, set: { data, sort, published, updatedAt: new Date() } });
}

export async function deleteBatch(slug: string) {
  const db = await getDb();
  await db.delete(batches).where(eq(batches.slug, slug));
}
