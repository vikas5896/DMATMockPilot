import "server-only";
import { and, count, eq, isNull, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { accessRequests, grants, promoCodes, type PromoCode } from "@/db/schema";
import { getPack } from "@/lib/access";
import { applyDiscount, chooseOffer, normalizeCode, promoProblem } from "@/lib/pricing";

export async function getPromo(raw: string): Promise<PromoCode | null> {
  const code = normalizeCode(raw);
  if (!code) return null;
  const db = await getDb();
  const [p] = await db.select().from(promoCodes).where(eq(promoCodes.code, code));
  return p ?? null;
}

/** A "use" is a pack actually granted with the code (paid), not just requested. */
export async function promoUses(code: string): Promise<number> {
  const db = await getDb();
  const [r] = await db
    .select({ n: count() })
    .from(grants)
    .where(and(eq(grants.promoCode, code), isNull(grants.revokedAt)));
  return r?.n ?? 0;
}

export type PromoCheck =
  | { ok: true; code: string; percentOff: number; priceInr: number; finalPriceInr: number }
  | { ok: false; error: string };

/** Validate a code for a pack and calculate the price. */
export async function checkPromo(raw: string, packSlug: string): Promise<PromoCheck> {
  const pack = await getPack(packSlug);
  if (!pack || !pack.published) return { ok: false, error: "This pack is not available." };
  if (pack.priceInr == null) return { ok: false, error: "Promo codes need a pack with a fixed price." };
  const promo = await getPromo(raw);
  const problem = promoProblem(
    promo && {
      active: promo.active,
      percentOff: promo.percentOff,
      packSlugs: promo.packSlugs as string[],
      maxUses: promo.maxUses,
      expiresOn: promo.expiresOn,
    },
    pack.slug,
    promo ? await promoUses(promo.code) : 0,
  );
  if (problem || !promo) return { ok: false, error: problem ?? "This promo code does not exist." };
  return {
    ok: true,
    code: promo.code,
    percentOff: promo.percentOff,
    priceInr: pack.priceInr,
    finalPriceInr: applyDiscount(pack.priceInr, promo.percentOff),
  };
}

export type PromoStats = PromoCode & { requests: number; sales: number; revenueInr: number };

/** Every code with how many students requested with it, how many paid, and the revenue. */
export async function listPromosWithStats(): Promise<PromoStats[]> {
  const db = await getDb();
  const [codes, reqs, sales] = await Promise.all([
    db.select().from(promoCodes).orderBy(promoCodes.createdAt),
    db
      .select({ code: accessRequests.promoCode, n: count() })
      .from(accessRequests)
      .groupBy(accessRequests.promoCode),
    db
      .select({ code: grants.promoCode, n: count(), revenue: sql<number>`coalesce(sum(${grants.amountInr}), 0)` })
      .from(grants)
      .where(isNull(grants.revokedAt))
      .groupBy(grants.promoCode),
  ]);
  return codes.map((c) => ({
    ...c,
    requests: reqs.find((r) => r.code === c.code)?.n ?? 0,
    sales: sales.find((s) => s.code === c.code)?.n ?? 0,
    revenueInr: Number(sales.find((s) => s.code === c.code)?.revenue ?? 0),
  }));
}

export type PromoOffer = Extract<PromoCheck, { ok: true }> & { auto: boolean };

/** The automatic offer (code marked "apply automatically") for this pack, if it is currently valid. */
export async function autoPromo(packSlug: string): Promise<PromoOffer | null> {
  const db = await getDb();
  const rows = await db
    .select({ code: promoCodes.code })
    .from(promoCodes)
    .where(and(eq(promoCodes.autoApply, true), eq(promoCodes.active, true)));
  for (const r of rows) {
    const c = await checkPromo(r.code, packSlug);
    if (c.ok) return { ...c, auto: true };
  }
  return null;
}

export type ResolvedPromo =
  | { ok: true; offer: PromoOffer | null; note?: string }
  | { ok: false; error: string; offer: PromoOffer | null };

/**
 * The price a student gets: the automatic offer, or the code they entered if it gives a bigger discount.
 * Codes never stack. Used for showing prices and again on the server when requesting or paying.
 */
export async function resolvePromo(raw: string | undefined, packSlug: string): Promise<ResolvedPromo> {
  const auto = await autoPromo(packSlug);
  const entered = normalizeCode(raw ?? "");
  if (!entered || entered === auto?.code) return { ok: true, offer: auto };
  const check = await checkPromo(entered, packSlug);
  if (!check.ok) return { ok: false, error: check.error, offer: auto };
  if (chooseOffer(check.percentOff, auto?.percentOff ?? null) === "auto" && auto) {
    return {
      ok: true,
      offer: auto,
      note: `${check.code} gives ${check.percentOff} % off. The offer ${auto.code} (${auto.percentOff} % off) is better, so we kept it for you.`,
    };
  }
  return { ok: true, offer: { ...check, auto: false } };
}

/** Automatic offers for several packs, keyed by pack slug (for the pack cards). */
export async function autoOffers(
  packSlugs: string[],
): Promise<Record<string, { code: string; percentOff: number; finalPriceInr: number; auto: true } | null>> {
  const entries = await Promise.all(
    packSlugs.map(async (slug) => {
      const o = await autoPromo(slug);
      return [slug, o ? { code: o.code, percentOff: o.percentOff, finalPriceInr: o.finalPriceInr, auto: true as const } : null] as const;
    }),
  );
  return Object.fromEntries(entries);
}
