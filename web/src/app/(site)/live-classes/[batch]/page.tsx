import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { formatRange, type Batch } from "@/content/site/batches";
import { ClassPayCard } from "@/components/site/ClassPayCard";
import { currentStudent } from "@/lib/auth";
import { isEnrolled, paymentsEnabled } from "@/lib/payments";
import { autoOffers } from "@/lib/promo";
import { getPublicBatch, getPublicBatches } from "@/lib/batch-store";
import { statusBadge } from "@/components/site/BatchCard";
import { StickyBookBar } from "@/components/site/StickyBookBar";
import { LeadForm } from "@/components/site/LeadForm";
import { Section } from "@/components/site/ui";
import { JsonLd } from "@/components/site/JsonLd";
import { BRAND } from "@/lib/brand";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ batch: string }> };

export async function generateStaticParams() {
  return (await getPublicBatches()).map((b) => ({ batch: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const b = await getPublicBatch((await params).batch);
  return b
    ? pageMetadata({ title: `${b.title} – Live dMAT Class`, description: b.summary, path: `/live-classes/${b.slug}` })
    : {};
}

export default function BatchPage({ params }: Props) {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-6 py-16 text-zinc-500">Loading…</div>}>
      <BatchContent params={params} />
    </Suspense>
  );
}

async function BatchContent({ params }: Props) {
  const b = await getPublicBatch((await params).batch);
  if (!b) notFound();

  const facts: [string, string][] = [
    ["Dates", formatRange(b.start, b.end)],
    ["Schedule", `${b.days}, ${b.time}`],
    ["Sessions", `${b.sessions} × ${b.sessionLength}`],
    ["Format", "Live online, with recordings"],
    ["Instructor", b.instructor ?? "To be announced"],
    ["Fee", b.priceInr ? `₹${b.priceInr.toLocaleString("en-IN")}` : (b.fee ?? "Announced soon")],
  ];
  const bookable = !!b.priceInr && b.status === "open";
  const when = `${b.days}, ${formatRange(b.start, b.end)}`;
  const price = b.priceInr ? `₹${b.priceInr.toLocaleString("en-IN")}` : "";

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: b.title,
          description: b.summary,
          url: `${SITE_URL}/live-classes/${b.slug}`,
          inLanguage: "en",
          provider: { "@type": "EducationalOrganization", "@id": `${SITE_URL}/#organization`, name: BRAND.name, url: `${SITE_URL}/` },
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "Online",
            startDate: b.start,
            endDate: b.end,
            courseSchedule: { "@type": "Schedule", repeatFrequency: "Weekly", description: `${b.days}, ${b.time}` },
            ...(b.instructor ? { instructor: { "@type": "Person", name: b.instructor } } : {}),
          },
        }}
      />
      <section className="bg-brand text-white">
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-8">
          <Link href="/live-classes" className="text-sm text-white/75 hover:text-white">
            ← All live classes
          </Link>
          <div className="mt-4">{statusBadge(b)}</div>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">{b.title}</h1>
          {b.forSitting && <p className="mt-2 text-white/75">For the {b.forSitting}</p>}
          {bookable ? (
            <>
              <ul className="mt-5 flex flex-wrap gap-2 text-sm font-semibold">
                <li className="rounded-full bg-white/15 px-3 py-1.5">📅 {when}</li>
                <li className="rounded-full bg-white/15 px-3 py-1.5">🕕 {b.time}</li>
                <li className="rounded-full bg-white px-3 py-1.5 text-brand">{price}</li>
              </ul>
              <p className="mt-4 max-w-2xl text-white/85">
                Led by people who have sat the real dMAT. {b.includes.slice(0, 2).join(" · ")}.
              </p>
              <a
                href="#register"
                className="mt-6 inline-block w-full rounded-md bg-white px-6 py-3.5 text-center text-lg font-bold text-brand shadow-sm hover:bg-brand-soft sm:w-auto"
              >
                Book your seat – {price}
              </a>
              <p className="mt-4 max-w-2xl text-sm text-white/75">{b.summary}</p>
            </>
          ) : (
            <p className="mt-4 max-w-2xl text-lg text-white/85">{b.summary}</p>
          )}
        </div>
      </section>
      {bookable && <StickyBookBar price={price} when={`${b.days}, ${formatRange(b.start, b.end).replace(/ \d{4}/g, "")}`} />}

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

          {/* on phones the booking card comes first, straight under the header */}
          <aside className={`flex flex-col gap-6 lg:sticky lg:top-24 lg:order-last lg:self-start ${bookable ? "order-first" : ""}`}>
            <dl
              className={`divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-zinc-50 ${bookable ? "order-last lg:order-none" : ""}`}
            >
              {facts.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 px-5 py-3 text-sm">
                  <dt className="text-zinc-500">{k}</dt>
                  <dd className="text-right font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <div id="register" className="scroll-mt-24">
              <h2 className="mb-3 text-xl font-bold">
                {b.status === "soon" ? "Get notified" : b.priceInr && b.status === "open" ? "Book your seat" : "Register your interest"}
              </h2>
              {b.priceInr && b.status === "open" ? (
                <Suspense fallback={<p className="text-zinc-500">Loading…</p>}>
                  <PaidRegistration b={b} />
                </Suspense>
              ) : b.status === "full" ? (
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

function Enquiry({ b, label }: { b: Batch; label: string }) {
  return <LeadForm defaultInterest="live-classes" fixedInterest batch={b.slug} batchTitle={b.title} submitLabel={label} />;
}

/** Paid class: book a seat online (Razorpay) with promo codes; the enquiry form stays as an alternative. */
async function PaidRegistration({ b }: { b: Batch }) {
  await connection(); // per request: login and offers depend on the visitor and the current date
  const me = await currentStudent();
  const signedIn = !!(me?.name && me.phone);
  const item = { kind: "class" as const, slug: b.slug };
  const [offers, enrolled] = await Promise.all([autoOffers([item]), signedIn ? isEnrolled(me!.id, b.slug) : Promise.resolve(false)]);
  return (
    <ClassPayCard
      slug={b.slug}
      title={b.title}
      priceInr={b.priceInr!}
      autoOffer={offers[b.slug]}
      signedIn={signedIn}
      enrolled={enrolled}
      payOnline={paymentsEnabled()}
      enquiry={<Enquiry b={b} label="Send enquiry" />}
    />
  );
}
