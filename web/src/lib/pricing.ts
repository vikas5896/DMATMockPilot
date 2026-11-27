/** Promo code rules, kept free of database code so they can be unit-tested. */

/** "  riya50 " → "RIYA50". Letters, digits, - and _ only. */
export function normalizeCode(raw: string): string {
  return raw.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "").slice(0, 30);
}

/** Price after a percentage discount, rounded down to whole rupees (₹1,599 at 50% → ₹799). */
export function applyDiscount(priceInr: number, percentOff: number): number {
  const pct = Math.min(100, Math.max(0, Math.round(percentOff)));
  return Math.floor((priceInr * (100 - pct)) / 100);
}

/** Today's date in India as YYYY-MM-DD. */
export function todayInIndia(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(now);
}

/** The Complete Germany Plan is sold as a pack, but only to approved students, and "all packs" promo codes don't cover it. */
export const PLAN_PACK = "germany-plan";

/** Something that can be bought: a test pack or a live class. */
export type Item = { kind: "pack" | "class"; slug: string };

/** "pack:full-pack" / "class:core-crash-course-jan"; a bare slug means a pack (older links). */
export function parseItem(key: string): Item {
  const m = /^(pack|class):(.+)$/.exec(key);
  return m ? { kind: m[1] as Item["kind"], slug: m[2] } : { kind: "pack", slug: key };
}

export const itemKey = (i: Item) => `${i.kind}:${i.slug}`;

export type PromoRule = {
  active: boolean;
  percentOff: number;
  /** true: valid for every pack and class; false: only for the ticked ones */
  appliesToAll: boolean;
  packSlugs: string[];
  classSlugs: string[];
  maxUses: number | null;
  expiresOn: string | null;
};

/** Whether a code may be used for this item at all (ignoring expiry and usage). */
export function promoCovers(promo: Pick<PromoRule, "appliesToAll" | "packSlugs" | "classSlugs">, item: Item): boolean {
  // the Germany plan is only discounted by codes that tick it explicitly
  if (item.kind === "pack" && item.slug === PLAN_PACK) return promo.packSlugs.includes(item.slug);
  if (promo.appliesToAll) return true;
  return item.kind === "pack" ? promo.packSlugs.includes(item.slug) : promo.classSlugs.includes(item.slug);
}

/** Why a code cannot be used for this item, or null when it is valid. */
export function promoProblem(promo: PromoRule | null, item: Item, uses: number, today = todayInIndia()): string | null {
  if (!promo) return "This promo code does not exist.";
  if (!promo.active) return "This promo code is no longer active.";
  if (promo.expiresOn && today > promo.expiresOn) return "This promo code has expired.";
  if (promo.maxUses != null && uses >= promo.maxUses) return "This promo code has been fully used.";
  if (!promoCovers(promo, item)) return `This promo code is not valid for this ${item.kind === "pack" ? "pack" : "live class"}.`;
  if (promo.percentOff < 1 || promo.percentOff > 100) return "This promo code is not valid.";
  return null;
}

/**
 * Codes never stack. With an automatic offer (e.g. PREP20 for everyone) and a code the student enters,
 * the entered code replaces the automatic one, unless the automatic one gives at least as much discount.
 */
export function chooseOffer(enteredPercent: number, autoPercent: number | null): "entered" | "auto" {
  return autoPercent != null && autoPercent >= enteredPercent ? "auto" : "entered";
}
