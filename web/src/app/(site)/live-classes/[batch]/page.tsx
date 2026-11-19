import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BATCHES, batchBySlug, formatRange } from "@/content/site/batches";
import { statusBadge } from "@/components/site/BatchCard";
import { LeadForm } from "@/components/site/LeadForm";
import { Section } from "@/components/site/ui";

type Props = { params: Promise<{ batch: string }> };

export function generateStaticParams() {
  return BATCHES.map((b) => ({ batch: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const b = batchBySlug((await params).batch);
  return b ? { title: `${b.title} – live class`, description: b.summary } : {};
}

export default function BatchPage({ params }: Props) {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-6 py-16 text-zinc-500">Loading…</div>}>
      <BatchContent params={params} />
    </Suspense>
  );
}

async function BatchContent({ params }: Props) {
  const b = batchBySlug((await params).batch);
  if (!b) notFound();

  const facts: [string, string][] = [
    ["Dates", formatRange(b.start, b.end)],
    ["Schedule", `${b.days}, ${b.time}`],
    ["Sessions", `${b.sessions} × ${b.sessionLength}`],
    ["Format", "Live online, with recordings"],
    ["Instructor", b.instructor ?? "To be announced"],
    ["Fee", b.fee ?? "Announced soon"],
  ];

  return (
    <>
      <section className="bg-brand text-white">
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-8">
          <Link href="/live-classes" className="text-sm text-white/75 hover:text-white">
            ← All live classes
          </Link>
          <div className="mt-4">{statusBadge(b)}</div>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">{b.title}</h1>
          {b.forSitting && <p className="mt-2 text-white/75">For the {b.forSitting}</p>}
          <p className="mt-4 max-w-2xl text-lg text-white/85">{b.summary}</p>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[3fr_2fr]">
          <div>
            <h2 className="text-2xl font-bold">What you will learn</h2>
            <div className="mt-6 space-y-6">
              {b.syllabus.map((block) => (
                <div key={block.title} className="rounded-xl border border-zinc-200 p-5">
                  <h3 className="font-semibold">{block.title}</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-700">
                    {block.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-2xl font-bold">Included</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {b.includes.map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 text-brand" aria-hidden>
                    ✓
                  </span>
                  {i}
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <dl className="divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-zinc-50">
              {facts.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 px-5 py-3 text-sm">
                  <dt className="text-zinc-500">{k}</dt>
                  <dd className="text-right font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <div id="register">
              <h2 className="mb-3 text-xl font-bold">{b.status === "soon" ? "Get notified" : "Register your interest"}</h2>
              {b.status === "full" ? (
                <p className="rounded-xl border border-zinc-200 p-5 text-zinc-600">
                  This batch is full. Please choose another batch or contact us for the waiting list.
                </p>
              ) : (
                <LeadForm
                  defaultInterest="live-classes"
                  fixedInterest
                  batch={b.slug}
                  batchTitle={b.title}
                  submitLabel={b.status === "soon" ? "Notify me" : "Reserve my seat"}
                />
              )}
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
