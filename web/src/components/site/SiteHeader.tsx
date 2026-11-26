"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BRAND } from "@/lib/brand";

export const NAV = [
  { href: "/mock-tests", label: "Mock Tests" },
  { href: "/live-classes", label: "Live Classes" },
  { href: "/study-in-germany", label: "Study in Germany" },
  { href: "/plans", label: "Plans" },
  { href: "/dmat-guide", label: "dMAT Guide" },
  { href: "/contact", label: "Contact" },
  { href: "/account", label: "My tests" },
];

export function SiteHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) => path === href || path.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-40 bg-brand text-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3.5">
        <Link href="/" className="text-lg font-bold tracking-tight" onClick={() => setOpen(false)}>
          {BRAND.name}
        </Link>
        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={active(n.href) ? "page" : undefined}
              className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                active(n.href) ? "bg-white/15" : "text-white/85 hover:bg-white/10 hover:text-white"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/test/full-1"
          className="ml-auto hidden rounded-md bg-white px-4 py-2 text-sm font-semibold text-brand hover:bg-brand-soft sm:block lg:ml-2"
        >
          Free mock test
        </Link>
        <button
          type="button"
          className="ml-auto rounded-md p-2 hover:bg-white/10 sm:ml-0 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
            {open ? (
              <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <nav className="border-t border-white/15 px-6 pb-4 lg:hidden" aria-label="Main mobile">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={`block rounded-md px-3 py-2.5 ${active(n.href) ? "bg-white/15" : "hover:bg-white/10"}`}
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/test/full-1"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-md bg-white px-3 py-2.5 text-center font-semibold text-brand"
          >
            Free mock test
          </Link>
        </nav>
      )}
    </header>
  );
}
