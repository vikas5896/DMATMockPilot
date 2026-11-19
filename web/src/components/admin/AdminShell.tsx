import Link from "next/link";
import type { ReactNode } from "react";
import { logoutAction } from "@/app/admin/actions";
import { BRAND } from "@/lib/brand";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/requests", label: "Requests" },
  { href: "/admin/payments", label: "Payments" },
  { href: "/admin/students", label: "Students" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/packs", label: "Packs" },
  { href: "/admin/promo-codes", label: "Promo codes" },
  { href: "/admin/batches", label: "Live batches" },
];

export function AdminShell({
  email,
  active,
  title,
  actions,
  children,
}: {
  email: string;
  active: string;
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-brand text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3">
          <Link href="/admin" className="font-bold">
            {BRAND.name} <span className="font-normal text-white/70">Admin</span>
          </Link>
          <nav className="flex flex-wrap gap-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`rounded-md px-3 py-1.5 text-sm ${active === n.href ? "bg-white/15" : "text-white/85 hover:bg-white/10"}`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-4 text-sm">
            <Link href="/" className="text-white/80 hover:text-white">
              View site ↗
            </Link>
            <span className="hidden text-white/70 md:inline">{email}</span>
            <form action={logoutAction}>
              <button className="rounded-md border border-white/40 px-3 py-1 hover:bg-white/10">Log out</button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          {actions}
        </div>
        {children}
      </main>
    </div>
  );
}

export const adminField =
  "mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

export function Loading() {
  return <div className="p-10 text-zinc-500">Loading…</div>;
}
