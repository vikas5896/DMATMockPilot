import "server-only";
import { and, asc, desc, eq, gt, inArray, isNull } from "drizzle-orm";
import { getDb, type Db } from "@/db";
import { accessRequests, grants, packs, type Grant, type Pack } from "@/db/schema";
import type { CatalogKind, CatalogTest } from "@/lib/exam/catalog";

/** Starter packs, copied into the database on first use. Prices and contents can then be edited in the admin panel. */
const DEFAULT_PACKS: (typeof packs.$inferInsert)[] = [
  {
    slug: "section-pack",
    name: "Section Pack",
    description: "Tests 2–10 for Figure Sequences, Mathematical Equations and Latin Squares (27 timed section tests).",
    priceInr: 499,
    validityDays: 180,
    kinds: ["figure-sequences", "equations", "latin-squares"],
    sort: 10,
  },
  {
    slug: "full-pack",
    name: "Full Pack",
    description: "Everything: Full dMAT Mocks 2–10 and tests 2–10 of every section, including the General Academic Module.",
    priceInr: 1599,
    validityDays: 180,
    kinds: ["full", "figure-sequences", "equations", "latin-squares", "subject"],
    sort: 20,
  },
];

async function ensurePacks(db: Db) {
  const [one] = await db.select({ slug: packs.slug }).from(packs).limit(1);
  if (!one) await db.insert(packs).values(DEFAULT_PACKS).onConflictDoNothing();
}

export async function listPacks(opts: { publishedOnly?: boolean } = {}): Promise<Pack[]> {
  const db = await getDb();
  await ensurePacks(db);
  const rows = await db.select().from(packs).orderBy(asc(packs.sort), asc(packs.name));
  return opts.publishedOnly ? rows.filter((p) => p.published) : rows;
}

export async function getPack(slug: string): Promise<Pack | null> {
  const db = await getDb();
  await ensurePacks(db);
  const [p] = await db.select().from(packs).where(eq(packs.slug, slug));
  return p ?? null;
}

export const packCovers = (pack: Pack, kind: CatalogKind) => (pack.kinds as string[]).includes(kind);

/** Grants that are not revoked and not expired. */
export async function activeGrants(studentId: number): Promise<Grant[]> {
  const db = await getDb();
  return db
    .select()
    .from(grants)
    .where(and(eq(grants.studentId, studentId), isNull(grants.revokedAt), gt(grants.expiresAt, new Date())))
    .orderBy(desc(grants.expiresAt));
}

/** Which test types the student has unlocked (beyond the free test 1). */
export async function unlockedKinds(studentId: number): Promise<Set<string>> {
  const active = await activeGrants(studentId);
  if (!active.length) return new Set();
  const db = await getDb();
  const ps = await db.select().from(packs).where(inArray(packs.slug, [...new Set(active.map((g) => g.packSlug))]));
  return new Set(ps.flatMap((p) => p.kinds as string[]));
}

export async function canAccess(studentId: number, test: CatalogTest): Promise<boolean> {
  if (test.free) return true;
  return (await unlockedKinds(studentId)).has(test.kind);
}

/** Open requests (not yet granted or closed) for this student. */
export async function openRequests(studentId: number) {
  const db = await getDb();
  return db
    .select()
    .from(accessRequests)
    .where(and(eq(accessRequests.studentId, studentId), inArray(accessRequests.status, ["new", "contacted", "paid"])))
    .orderBy(desc(accessRequests.createdAt));
}

/** Record a request; returns false if the same pack is already requested and still open. */
export async function createRequest(
  studentId: number,
  packSlug: string,
  message: string | null,
  promoCode: string | null = null,
  quotedPriceInr: number | null = null,
): Promise<boolean> {
  const open = await openRequests(studentId);
  if (open.some((r) => r.packSlug === packSlug)) return false;
  const db = await getDb();
  await db.insert(accessRequests).values({ studentId, packSlug, message, promoCode, quotedPriceInr });
  return true;
}
