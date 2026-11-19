import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { ExamRunner } from "@/components/exam/ExamRunner";
import { LockedTest } from "@/components/exam/LockedTest";
import { currentStudent } from "@/lib/auth";
import { getOrCreateAttempt } from "@/lib/attempt-store";
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
