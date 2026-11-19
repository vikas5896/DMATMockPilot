import Link from "next/link";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-brand text-white">
      <div className="mx-auto max-w-6xl px-6 pb-14 pt-10">
        {eyebrow && <p className="text-sm font-semibold uppercase tracking-wide text-white/70">{eyebrow}</p>}
        <h1 className="mt-2 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-white/85">{intro}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

export function Section({
  title,
  intro,
  children,
  tone = "white",
  id,
}: {
  title?: string;
  intro?: string;
  children: ReactNode;
  tone?: "white" | "soft";
  id?: string;
}) {
  return (
    <section id={id} className={tone === "soft" ? "bg-zinc-50" : ""}>
      <div className="mx-auto max-w-6xl px-6 py-14">
        {title && <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>}
        {intro && <p className="mt-2 max-w-3xl text-zinc-600">{intro}</p>}
        <div className={title || intro ? "mt-8" : ""}>{children}</div>
      </div>
    </section>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "light" | "outline-light" | "outline";
}) {
  const cls = {
    primary: "bg-brand text-white hover:bg-brand-dark",
    light: "bg-white text-brand hover:bg-brand-soft",
    "outline-light": "border border-white/60 text-white hover:bg-white/10",
    outline: "border border-brand text-brand hover:bg-brand-soft",
  }[variant];
  return (
    <Link href={href} className={`inline-block rounded-md px-6 py-3 font-semibold transition ${cls}`}>
      {children}
    </Link>
  );
}

export function Badge({ children, tone = "brand" }: { children: ReactNode; tone?: "brand" | "green" | "amber" | "zinc" }) {
  const cls = {
    brand: "bg-brand-soft text-brand",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-800",
    zinc: "bg-zinc-100 text-zinc-600",
  }[tone];
  return <span className={`inline-block self-start rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls}`}>{children}</span>;
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white">
      {items.map((f) => (
        <details key={f.q} className="group px-5 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
            {f.q}
            <span className="text-brand transition group-open:rotate-45" aria-hidden>
              +
            </span>
          </summary>
          <p className="mt-2 text-zinc-600">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
