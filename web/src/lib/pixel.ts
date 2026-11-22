/**
 * Meta (Facebook/Instagram) Pixel: lets Meta Ads measure bookings and sign-ups from our ads.
 * The ID is public by design (it is in every page's HTML). Set NEXT_PUBLIC_META_PIXEL_ID to override.
 */
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "2052778545432729";

type Fbq = (cmd: string, ...args: unknown[]) => void;

/** Send a standard event, e.g. track("Purchase", { value: 49, currency: "INR" }). Safe if the pixel is blocked. */
export function track(event: string, params?: Record<string, unknown>, eventId?: string) {
  if (typeof window === "undefined") return;
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (!fbq) return;
  try {
    if (eventId) fbq("track", event, params ?? {}, { eventID: eventId });
    else fbq("track", event, params ?? {});
  } catch {
    // ad blockers or a failed load: never break the page
  }
}
