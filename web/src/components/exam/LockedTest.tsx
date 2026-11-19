import Link from "next/link";
import { PackCard } from "@/components/site/PackCard";
import type { Pack } from "@/db/schema";
import { BRAND } from "@/lib/brand";
import type { CatalogTest } from "@/lib/exam/catalog";

/** Shown instead of the exam for tests that need a pack the student does not have yet. */
export function LockedTest({ test, packs, requested }: { test: CatalogTest; packs: Pack[]; requested: string[] }) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="flex items-center justify-between bg-brand px-6 py-4 text-white">
        <Link href="/" className="font-semibold">
          {BRAND.name}
        </Link>
        <Link href="/account" className="text-sm text-white/85 hover:text-white">
          My tests
        </Link>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">🔒 Unlock this test</p>
        <h1 className="mt-2 text-3xl font-bold">{test.title}</h1>
        <p className="mt-3 max-w-2xl text-zinc-700">
          This test is part of a pack. Request access below: we contact you on WhatsApp or by phone with the payment
          details, and the tests unlock in your account as soon as the payment is confirmed.
        </p>
        <div className={`mt-8 grid gap-6 ${packs.length > 1 ? "md:grid-cols-2" : "max-w-md"}`}>
          {packs.map((p, i) => (
            <PackCard
              key={p.slug}
              pack={p}
              signedIn
              requested={requested.includes(p.slug)}
              from={`/test/${test.id}`}
              highlight={i === packs.length - 1}
            />
          ))}
        </div>
        {packs.length === 0 && (
          <p className="mt-8 text-zinc-600">This test is not part of any pack yet. Please contact us on WhatsApp.</p>
        )}
        <p className="mt-10">
          <Link href="/account" className="font-semibold text-brand hover:underline">
            ← Back to my tests
          </Link>
        </p>
      </main>
    </div>
  );
}
