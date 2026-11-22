"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { META_PIXEL_ID } from "@/lib/pixel";

const BASE = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');`;

/** Loads the Meta Pixel and records a PageView on every public page (admin pages are left out). */
export function MetaPixel() {
  const pathname = usePathname() ?? "/";
  const admin = pathname.startsWith("/admin");
  const last = useRef<string | null>(null);

  useEffect(() => {
    if (admin || last.current === pathname) return;
    last.current = pathname;
    const send = () => (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq?.("track", "PageView");
    // the base code may still be loading on the very first page
    if ((window as unknown as { fbq?: unknown }).fbq) send();
    else setTimeout(send, 1500);
  }, [pathname, admin]);

  if (admin || !META_PIXEL_ID) return null;
  return <Script id="meta-pixel" strategy="afterInteractive">{BASE}</Script>;
}
