"use client";

import { Analytics } from "@vercel/analytics/next";

/** Vercel Web Analytics (no cookies). Admin pages are left out so your own visits don't count. */
export function SiteAnalytics() {
  return <Analytics beforeSend={(e) => (new URL(e.url).pathname.startsWith("/admin") ? null : e)} />;
}
