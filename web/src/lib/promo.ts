import "server-only";
import { and, count, eq, isNull, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { accessRequests, classEnrollments, grants, promoCodes, type PromoCode } from "@/db/schema";
import { getPack, listPacks } from "@/lib/access";
import { getStoredBatch, listAllBatches } from "@/lib/batch-store";
import { applyDiscount, chooseOffer, normalizeCode, promoCovers, promoProblem, type Item } from "@/lib/pricing";

export async function getPromo(raw: string): Promise<PromoCode | null> {
  const code = normalizeCode(raw);
  if (!code) return null;
  const db = await getDb();
  const [p] = await db.select().from(promoCodes).where(eq(promoCodes.code, code));
  return p ?? null;
}

const toRule = (p: PromoCode) => ({
  active: p.active,
  percentOff: p.percentOff,
  appliesToAll: p.appliesToAll,
  packSlugs: (p.packSlugs as string[]) ?? [],
  classSlugs: (p.classSlugs as string[]) ?? [],
  maxUses: p.maxUses,
  expiresOn: p.expiresOn,
});

/** A "use" is a sale with the code: a pack granted (not revoked) or a live-class enrolment. */
export async function promoUses(code: string): Promise<number> {
  const db = await getDb();
  const [[g], [e]] = await Promise.all([
    db.select({ n: count() }).from(grants).where(and(eq(grants.promoCode, code), isNull(grants.revokedAt))),
    db.select({ n: count() }).from(classEnrollments).where(eq(classEnrollments.promoCode, code)),
  ]);
  return (g?.n ?? 0) + (e?.n ?? 0);
}

export type ItemInfo = { item: Item; name: string; priceInr: number | null; available: boolean };

/** Name, price and availability of a pack or a live class. */
export async function getItemInfo(item: Item): Promise<ItemInfo | null> {
  if (item.kind === "pack") {
    const p = await getPack(item.slug);
    return p ? { item, name: p.name, priceInr: p.priceInr, available: p.published } : null;
  }
  const b = await getStoredBatch(item.slug);
  return b
    ? { item, name: b.title, priceInr: b.priceInr && b.priceInr > 0 ? b.priceInr : null, available: b.published && b.status === "open" }
    : null;
}

export type PromoCheck =
  | { ok: true; code: string; percentOff: number; priceInr: number; finalPriceInr: number }
  | { ok: false; error: string };

/** Validate a code for a pack or class and calculate the price. */
export async function checkPromo(raw: string, item: Item): Promise<PromoCheck> {
  const info = await getItemInfo(item);
  if (!info || !info.available) return { ok: false, error: `This ${item.kind === "pack" ? "pack" : "class"} is not available.` };
  if (info.priceInr == null) return { ok: false, error: "Promo codes need a fixed price." };
  const promo = await getPromo(raw);
  const problem = promoProblem(promo && toRule(promo), item, promo ? await promoUses(promo.code) : 0);
  if (problem || !promo) return { ok: false, error: problem ?? "This promo code does not exist." };
  return {
    ok: true,
    code: promo.code,
    percentOff: promo.percentOff,
    priceInr: info.priceInr,
    finalPriceInr: applyDiscount(info.priceInr, promo.percentOff),
  };
}

export type PromoStats = PromoCode & { requests: number; sales: number; revenueInr: number };

/** Every code with how many students requested with it, how many paid (packs + classes), and the revenue. */
export async function listPromosWithStats(): Promise<PromoStats[]> {
  const db = await getDb();
  const [codes, reqs, sales, enrol] = await Promise.all([
    db.select().from(promoCodes).orderBy(promoCodes.createdAt),
    db.select({ code: accessRequests.promoCode, n: count() }).from(accessRequests).groupBy(accessRequests.promoCode),
    db
      .select({ code: grants.promoCode, n: count(), revenue: sql<number>`coalesce(sum(${grants.amountInr}), 0)` })
      .from(grants)
      .where(isNull(grants.revokedAt))
      .groupBy(grants.promoCode),
    db
      .select({ code: classEnrollments.promoCode, n: count(), revenue: sql<number>`coalesce(sum(${classEnrollments.amountInr}), 0)` })
      .from(classEnrollments)
      .groupBy(classEnrollments.promoCode),
  ]);
  return codes.map((c) => {
    const s = sales.find((x) => x.code === c.code);
    const e = enrol.find((x) => x.code === c.code);
    return {
      ...c,
      requests: reqs.find((r) => r.code === c.code)?.n ?? 0,
      sales: (s?.n ?? 0) + (e?.n ?? 0),
      revenueInr: Number(s?.revenue ?? 0) + Number(e?.revenue ?? 0),
    };
  });
}

export type PromoOffer = Extract<PromoCheck, { ok: true }> & { auto: boolean };

/** The automatic offer (code marked "apply automatically") for this item, if it is currently valid. */
export async function autoPromo(item: Item): Promise<PromoOffer | null> {
  const db = await getDb();
  const rows = await db
    .select({ code: promoCodes.code })
    .from(promoCodes)
    .where(and(eq(promoCodes.autoApply, true), eq(promoCodes.active, true)));
  for (const r of rows) {
    const c = await checkPromo(r.code, item);
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
export async function resolvePromo(raw: string | undefined, item: Item): Promise<ResolvedPromo> {
  const auto = await autoPromo(item);
  const entered = normalizeCode(raw ?? "");
  if (!entered || entered === auto?.code) return { ok: true, offer: auto };
  const check = await checkPromo(entered, item);
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

export type CardOffer = { code: string; percentOff: number; finalPriceInr: number; auto: true };

/** Automatic offers for several items, keyed by slug (for the pack and class cards). */
export async function autoOffers(items: Item[]): Promise<Record<string, CardOffer | null>> {
  const entries = await Promise.all(
    items.map(async (it) => {
      const o = await autoPromo(it);
      return [it.slug, o ? { code: o.code, percentOff: o.percentOff, finalPriceInr: o.finalPriceInr, auto: true as const } : null] as const;
    }),
  );
  return Object.fromEntries(entries);
}

export type CoverageRow = {
  item: Item;
  name: string;
  priceInr: number;
  onSale: boolean;
  autoCode: { code: string; percentOff: number; finalPriceInr: number } | null;
  codes: { code: string; percentOff: number; active: boolean }[];
};

/** For the admin overview: every pack and paid class, with the codes that can be used there. */
export async function promoCoverage(): Promise<CoverageRow[]> {
  const db = await getDb();
  const [packs, classes, codes] = await Promise.all([listPacks(), listAllBatches(), db.select().from(promoCodes)]);
  const items: { item: Item; name: string; priceInr: number | null; onSale: boolean }[] = [
    ...packs.map((p) => ({ item: { kind: "pack" as const, slug: p.slug }, name: p.name, priceInr: p.priceInr, onSale: p.published })),
    ...classes.map((b) => ({
      item: { kind: "class" as const, slug: b.slug },
      name: b.title,
      priceInr: b.priceInr && b.priceInr > 0 ? b.priceInr : null,
      onSale: b.published && b.status === "open",
    })),
  ];
  return items
    .filter((i) => i.priceInr != null)
    .map((i) => {
      const valid = codes.filter((c) => promoCovers(toRule(c), i.item));
      const auto = valid.find((c) => c.autoApply && c.active);
      return {
        item: i.item,
        name: i.name,
        priceInr: i.priceInr!,
        onSale: i.onSale,
        autoCode: auto ? { code: auto.code, percentOff: auto.percentOff, finalPriceInr: applyDiscount(i.priceInr!, auto.percentOff) } : null,
        codes: valid
          .filter((c) => c !== auto)
          .map((c) => ({ code: c.code, percentOff: c.percentOff, active: c.active }))
          .sort((a, b) => Number(b.active) - Number(a.active) || a.code.localeCompare(b.code)),
      };
    });
}
