"use client";

import { useEffect } from "react";
import { describeVisit, SOURCE_COOKIE, SOURCE_DAYS } from "@/lib/source";

export const PROMO_KEY = "mp_promo";

/**
 * Influencer links like dmatmockprep.com/?code=RIYA50 (or ?promo=RIYA50) on any page:
 * remember the code, so it is applied automatically on the Packs page, even after signing up.
 * Also remembers where the visitor came from (utm tags, code or referring site) in a cookie,
 * which is saved with their signup or enquiry. Nothing is shown on screen.
 */
export function PromoCatcher() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = (url.searchParams.get("code") ?? url.searchParams.get("promo") ?? "").trim();
    if (code) {
      try {
        localStorage.setItem(PROMO_KEY, code.toUpperCase().slice(0, 30));
      } catch {
        // storage blocked: the code can still be typed in by hand
      }
    }
    const visit = describeVisit(url, document.referrer, window.location.hostname);
    const hasSource = document.cookie.split("; ").some((c) => c.startsWith(`${SOURCE_COOKIE}=`));
    if (!hasSource || visit.tagged) {
      document.cookie = `${SOURCE_COOKIE}=${encodeURIComponent(visit.label)}; path=/; max-age=${SOURCE_DAYS * 86400}; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    }
  }, []);
  return null;
}
