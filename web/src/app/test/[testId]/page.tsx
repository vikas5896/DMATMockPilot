import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { ExamRunner } from "@/components/exam/ExamRunner";
import { LockedTest } from "@/components/exam/LockedTest";
import { currentStudent } from "@/lib/auth";
import { getAttempt, getOrCreateAttempt } from "@/lib/attempt-store";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { canAccess, listPacks, openRequests, packCovers } from "@/lib/access";
import { paymentsEnabled } from "@/lib/payments";
import { parseTestId } from "@/lib/exam/catalog";
import { isTestKind, type Attempt } from "@/lib/exam/tests";

type Props = { params: Promise<{ testId: string }> };

export const metadata = { robots: { index: false, follow: false } };

export default function TestPage(props: Props) {
  return (
    <Suspense fallback={<div className="p-10 text-zinc-500">Preparing your test…</div>}>
      <TestLoader {...props} />
    </Suspense>
  );
}

async function TestLoader({ params }: Props) {
  const { testId } = await params;
  const test = parseTestId(testId);
  if (!test) {
    // old links like /test/full or /test/equations
    if (isTestKind(testId)) redirect("/mock-tests");
    notFound();
  }

  const me = await currentStudent();
  if (!me || !me.name || !me.phone) redirect(`/login?next=${encodeURIComponent(`/test/${test.id}`)}`);

  // texts for this test not written yet (an attempt started earlier may still be finished)
  if (!test.available && !(await getAttempt(me.id, test.id))) return <ComingSoon title={test.title} />;

  if (!(await canAccess(me.id, test))) {
    const [packList, open] = await Promise.all([listPacks({ publishedOnly: true }), openRequests(me.id)]);
    return (
      <LockedTest
        test={test}
        packs={packList.filter((p) => packCovers(p, test.kind))}
        requested={open.map((r) => r.packSlug)}
        payOnline={paymentsEnabled()}
      />
    );
  }

  const row = await getOrCreateAttempt(me.id, test);
  return (
    <ExamRunner
      key={row.id}
      testId={test.id}
      testTitle={test.title}
      initial={row.data as Attempt}
    />
  );
}

function ComingSoon({ title }: { title: string }) {
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
      <main className="mx-auto max-w-2xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">Coming soon</p>
        <h1 className="mt-2 text-3xl font-bold">{title}</h1>
        <p className="mt-3 text-zinc-700">
          We are writing a completely new set of General Academic Module texts for this test, so you never see the same
          texts twice. It will appear in My tests as soon as it is ready.
        </p>
        <Link href="/account" className="mt-8 inline-block font-semibold text-brand hover:underline">
          ← Back to my tests
        </Link>
      </main>
    </div>
  );
}
