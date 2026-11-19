import Link from "next/link";
import { LeadForm } from "@/components/site/LeadForm";
import { BRAND, waHref } from "@/lib/brand";
import type { CatalogTest } from "@/lib/exam/catalog";

/** Shown instead of the exam for tests that need a paid pack. */
export function LockedTest({ test }: { test: CatalogTest }) {
  const wa = BRAND.contact.whatsapp;
  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-brand px-6 py-4 text-white">
        <Link href="/" className="font-semibold">
          {BRAND.name}
        </Link>
      </header>
      <main className="mx-auto grid max-w-5xl gap-10 px-6 py-12 md:grid-cols-[3fr_2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">🔒 Paid pack</p>
          <h1 className="mt-2 text-3xl font-bold">{test.title}</h1>
          <p className="mt-3 text-zinc-700">
            This test is part of our paid mock packs. Online payment is launching soon. Leave your details and we will
            tell you as soon as packs are available, or message us to get access earlier.
          </p>
          <ul className="mt-6 space-y-2 text-zinc-700">
            <li>✓ Full dMAT Mocks 2–10 in the real exam format</li>
            <li>✓ Section tests 2–10 for Figure Sequences, Equations, Latin Squares and the General Academic Module</li>
            <li>✓ Scores, time per task and step-by-step solutions for every test</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/account" className="rounded-md bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-dark">
              Back to my tests
            </Link>
            {wa && (
              <a
                href={waHref(wa, `Hi ${BRAND.name}, I would like access to ${test.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-emerald-600 px-6 py-3 font-semibold text-emerald-700 hover:bg-emerald-50"
              >
                Ask on WhatsApp
              </a>
            )}
          </div>
        </div>
        <div>
          <h2 className="mb-3 font-semibold">Get notified when packs launch</h2>
          <LeadForm defaultInterest="mock-tests" fixedInterest submitLabel="Notify me" />
        </div>
      </main>
    </div>
  );
}
