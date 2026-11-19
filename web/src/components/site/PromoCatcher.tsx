"use client";

import { useEffect } from "react";

export const PROMO_KEY = "mp_promo";

/**
 * Influencer links like dmatmockprep.com/?code=RIYA50 (or ?promo=RIYA50) on any page:
 * remember the code, so it is applied automatically on the Packs page, even after signing up.
 */
export function PromoCatcher() {
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const code = (p.get("code") ?? p.get("promo") ?? "").trim();
    if (code) {
      try {
        localStorage.setItem(PROMO_KEY, code.toUpperCase().slice(0, 30));
      } catch {
        // storage blocked: the code can still be typed in by hand
      }
    }
  }, []);
  return null;
}
