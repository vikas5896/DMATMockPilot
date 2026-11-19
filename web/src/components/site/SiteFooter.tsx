import Link from "next/link";
import { BRAND, telHref } from "@/lib/brand";

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
      { href: "/contact?interest=consultancy", label: "Free profile check" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy policy" },
    ],
  },
];

export function SiteFooter() {
  const { email, phone } = BRAND.contact;
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <p className="text-lg font-bold text-brand">{BRAND.name}</p>
          <p className="mt-2 max-w-xs text-sm text-zinc-600">{BRAND.tagline}.</p>
          {(email || phone) && (
            <p className="mt-3 space-y-1 text-sm text-zinc-700">
              {email && <a href={`mailto:${email}`} className="block hover:text-brand">{email}</a>}
              {phone && <a href={telHref(phone)} className="block hover:text-brand">{phone}</a>}
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
        <p className="mx-auto max-w-6xl px-6 py-5 text-xs leading-5 text-zinc-500">
          {BRAND.name} is an independent preparation and guidance service. It is not affiliated with, or endorsed by,
          g.a.s.t., APS India, DAAD or any German university. dMAT is the name of the test we help you prepare for.
        </p>
      </div>
    </footer>
  );
}
