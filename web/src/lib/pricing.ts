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

export type PromoRule = {
  active: boolean;
  percentOff: number;
  packSlugs: string[];
  maxUses: number | null;
  expiresOn: string | null;
};

/** Why a code cannot be used for this pack, or null when it is valid. */
export function promoProblem(promo: PromoRule | null, packSlug: string, uses: number, today = todayInIndia()): string | null {
  if (!promo) return "This promo code does not exist.";
  if (!promo.active) return "This promo code is no longer active.";
  if (promo.expiresOn && today > promo.expiresOn) return "This promo code has expired.";
  if (promo.maxUses != null && uses >= promo.maxUses) return "This promo code has been fully used.";
  if (promo.packSlugs.length && !promo.packSlugs.includes(packSlug)) return "This promo code is not valid for this pack.";
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
