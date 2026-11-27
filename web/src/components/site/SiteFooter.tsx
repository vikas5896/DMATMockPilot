import Link from "next/link";
import { BRAND, telHref, waHref, WHATSAPP_GREETING } from "@/lib/brand";

const COLUMNS = [
  {
    title: "Prepare",
    links: [
      { href: "/mock-tests", label: "Mock tests" },
      { href: "/live-classes", label: "Live classes" },
      { href: "/dmat-guide", label: "dMAT guide" },
    ],
  },
  {
    title: "Germany",
    links: [
      { href: "/study-in-germany", label: "Study in Germany" },
      { href: "/plans", label: "Plans" },
      { href: "/profile-evaluation", label: "Free profile evaluation" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms" },
      { href: "/refund-policy", label: "Refund policy" },
    ],
  },
];

export function SiteFooter() {
  const { email, phone, whatsapp } = BRAND.contact;
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <p className="text-lg font-bold text-brand">{BRAND.name}</p>
          <p className="mt-2 max-w-xs text-sm text-zinc-600">{BRAND.tagline}.</p>
          {BRAND.social.instagram && (
            <a
              href={BRAND.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${BRAND.name} on Instagram`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-brand"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              @dmatmockprep
            </a>
          )}
          {BRAND.social.youtube && (
            <a
              href={BRAND.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${BRAND.name} on YouTube`}
              className="mt-2 flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-brand"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="5" width="20" height="14" rx="4" />
                <path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none" />
              </svg>
              YouTube
            </a>
          )}
          {(email || phone) && (
            <p className="mt-3 space-y-1 text-sm text-zinc-700">
              {email && <a href={`mailto:${email}`} className="block hover:text-brand">{email}</a>}
              {phone && <a href={telHref(phone)} className="block hover:text-brand">{phone}</a>}
              {whatsapp && (
                <a
                  href={waHref(whatsapp, WHATSAPP_GREETING)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-medium text-emerald-700 hover:text-emerald-800"
                >
                  Chat on WhatsApp
                </a>
              )}
            </p>
          )}
        </div>
        {COLUMNS.map((c) => (
          <div key={c.title}>
            <p className="text-sm font-semibold">{c.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-zinc-200">
        <p data-nosnippet className="mx-auto max-w-6xl px-6 py-5 text-xs leading-5 text-zinc-500">
          {BRAND.name} is an independent preparation and guidance service. It is not affiliated with, or endorsed by,
          g.a.s.t., APS India, DAAD or any German university. dMAT is the name of the test we help you prepare for.
        </p>
      </div>
    </footer>
  );
}
