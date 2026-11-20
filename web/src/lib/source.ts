/**
 * Where a visitor came from, saved quietly (no form field) on signups and enquiries.
 * Links like dmatmockprep.com/?utm_source=insta_reel3 or ?code=RIYA50 are recorded as such;
 * otherwise the referring site (google.com, instagram.com…) or "direct".
 */
export const SOURCE_COOKIE = "mp_src";
export const SOURCE_DAYS = 90;
const MAX = 150;

function clean(v: string | null | undefined): string {
  return (v ?? "").replace(/[^\w .:/@+-]/g, "").trim().slice(0, 60);
}

function siteName(host: string): string {
  return host.toLowerCase().replace(/^(www|m|l|lm|mobile)\./, "");
}

/** Label for one landing. `tagged` = the link carried a campaign tag or promo code, which beats an older source. */
export function describeVisit(url: URL, referrer: string, ownHost: string): { label: string; tagged: boolean } {
  const p = url.searchParams;
  const utm = [clean(p.get("utm_source")), clean(p.get("utm_medium")), clean(p.get("utm_campaign"))].filter(Boolean);
  const code = clean(p.get("code") ?? p.get("promo")).toUpperCase();
  let label: string;
  let tagged = true;
  if (utm.length) label = utm.join(" / ");
  else if (code) label = `code ${code}`;
  else {
    tagged = false;
    let host = "";
    try {
      host = referrer ? new URL(referrer).hostname : "";
    } catch {
      host = "";
    }
    label = host && siteName(host) !== siteName(ownHost) ? siteName(host) : "direct";
  }
  const landing = clean(url.pathname) || "/";
  return { label: `${label} → ${landing}`.slice(0, MAX), tagged };
}

/** Cookie value back to a safe label for the database. */
export function parseSource(raw: string | undefined): string | null {
  if (!raw) return null;
  let v: string;
  try {
    v = decodeURIComponent(raw);
  } catch {
    return null;
  }
  v = v.replace(/[^\w .:/@+→-]/g, "").trim().slice(0, MAX);
  return v || null;
}

/** "insta_reel3 / social → /live-classes" → "insta_reel3 / social" (for grouping in admin). */
export function sourceChannel(source: string | null): string {
  if (!source) return "unknown (before tracking)";
  return source.split(" → ")[0] || "direct";
}
