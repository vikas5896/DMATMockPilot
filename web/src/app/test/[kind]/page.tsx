import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ExamRunner } from "@/components/exam/ExamRunner";
import { isTestKind } from "@/lib/exam/tests";

type Props = {
  params: Promise<{ kind: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function TestPage(props: Props) {
  return (
    <Suspense fallback={<div className="p-10 text-zinc-500">Preparing your test…</div>}>
      <TestLoader {...props} />
    </Suspense>
  );
}

async function TestLoader({ params, searchParams }: Props) {
  const { kind } = await params;
  const { seed } = await searchParams;
  if (!isTestKind(kind)) notFound();
  const n = typeof seed === "string" && /^\d+$/.test(seed) ? Number(seed) : undefined;
  return <ExamRunner key={`${kind}-${n ?? "new"}`} kind={kind} seed={n} />;
}
