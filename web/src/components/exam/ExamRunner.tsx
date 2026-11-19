"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { childSeed, randomSeed } from "@/lib/rng";
import { buildSubtest } from "@/lib/generators";
import { isAnswered } from "@/lib/exam/scoring";
import {
  activeSeed,
  loadAttempt,
  newAttempt,
  saveAttempt,
  TESTS,
  type Attempt,
  type TestKind,
} from "@/lib/exam/tests";
import type { Answer, EquationsItem } from "@/lib/exam/types";
import { BRAND } from "@/lib/brand";
import { Dialog, ExamFooter, ExamHeader, formatClock, InstructionsBar } from "./ExamChrome";
import { ItemView } from "./ItemView";
import { Results } from "./Results";

const noopSubscribe = () => () => {};

export function ExamRunner({ kind, seed }: { kind: TestKind; seed?: number }) {
  const router = useRouter();
  const isClient = useSyncExternalStore(noopSubscribe, () => true, () => false);

  // No seed in the URL: resume the active attempt for this test, or start a new one.
  useEffect(() => {
    if (seed == null) router.replace(`/test/${kind}?seed=${activeSeed(kind) ?? randomSeed()}`);
  }, [kind, seed, router]);

  if (!isClient || seed == null) return <div className="p-10 text-zinc-500">Preparing your test…</div>;
  return <AttemptView kind={kind} seed={seed} />;
}

function AttemptView({ kind, seed }: { kind: TestKind; seed: number }) {
  const router = useRouter();
  const test = TESTS[kind];
  const [attempt, setAttempt] = useState<Attempt>(() => loadAttempt(kind, seed) ?? newAttempt(kind, seed));

  const items = useMemo(
    () => test.subtests.map((spec, i) => buildSubtest(spec, childSeed(seed, i + 1))),
    [seed, test.subtests],
  );

  const update = useCallback((fn: (a: Attempt) => Attempt) => {
    setAttempt((prev) => {
      const next = fn(structuredClone(prev));
      saveAttempt(next);
      return next;
    });
  }, []);

  if (attempt.status === "finished") {
    return (
      <Results
        attempt={attempt}
        items={items}
        onNew={() => {
          const s = randomSeed();
          router.push(`/test/${kind}?seed=${s}`);
        }}
      />
    );
  }

  const spec = test.subtests[attempt.stage];

  if (attempt.status === "intro") {
    return (
      <div className="flex min-h-screen flex-col">
        <ExamHeader remainingMs={spec.timeSec * 1000} subtests={test.subtests} stage={attempt.stage} />
        <main className="mx-auto max-w-2xl flex-1 px-6 py-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            Subtest {attempt.stage + 1} of {test.subtests.length}
          </p>
          <h1 className="mt-1 text-3xl font-bold">{spec.title}</h1>
          <p className="mt-2 text-zinc-600">
            {spec.count} tasks · {spec.timeSec / 60} minutes
          </p>
          <div className="mt-6 space-y-2 rounded-lg border border-zinc-200 bg-zinc-50 p-5 text-[15px] leading-7">
            <p className="font-semibold">{spec.instructions.heading}</p>
            {spec.instructions.lines.map((l, i) => (
              <p key={i}>{l}</p>
            ))}
          </div>
          <ul className="mt-6 list-disc space-y-1 pl-5 text-sm text-zinc-600">
            <li>The timer starts when you click Start and keeps running if you close the page.</li>
            <li>When the time is up, or you end the subtest, it locks and you cannot return to it.</li>
            <li>No notes, no calculator. Guess rather than leave a blank: there is no negative marking.</li>
          </ul>
          <button
            type="button"
            onClick={() =>
              update((a) => ({ ...a, status: "running", deadline: Date.now() + spec.timeSec * 1000 }))
            }
            className="mt-8 rounded-md bg-brand px-8 py-3 font-semibold text-white hover:bg-brand-dark"
          >
            Start {spec.title}
          </button>
          <p className="mt-6 text-xs text-zinc-400">
            <Link href="/" className="underline">
              Leave
            </Link>{" "}
            · {BRAND.name} is an independent practice platform, not affiliated with g.a.s.t.
          </p>
        </main>
      </div>
    );
  }

  return <RunningSubtest attempt={attempt} items={items} update={update} />;
}

function RunningSubtest({
  attempt,
  items,
  update,
}: {
  attempt: Attempt;
  items: ReturnType<typeof buildSubtest>[];
  update: (fn: (a: Attempt) => Attempt) => void;
}) {
  const test = TESTS[attempt.kind];
  const stage = attempt.stage;
  const spec = test.subtests[stage];
  const subItems = items[stage];
  const current = attempt.current[stage];
  const [now, setNow] = useState(() => Date.now());
  const [showInstr, setShowInstr] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [confirmEnd, setConfirmEnd] = useState(false);
  const since = useRef(0);
  useEffect(() => {
    since.current = Date.now();
  }, []);

  const remaining = (attempt.deadline ?? 0) - now;

  /** time spent on the current question since the last switch (read outside state updaters, which must stay pure) */
  const takeElapsed = () => {
    const t = Date.now();
    const dt = t - since.current;
    since.current = t;
    return dt;
  };

  const locked = useRef(false);
  const lock = useCallback(() => {
    if (locked.current) return;
    locked.current = true;
    const dt = takeElapsed();
    const t = Date.now();
    update((a) => {
      a.timeMs[stage][a.current[stage]] += dt;
      a.usedMs[stage] = Math.min(spec.timeSec * 1000, spec.timeSec * 1000 - ((a.deadline ?? 0) - t));
      const last = stage === test.subtests.length - 1;
      return { ...a, stage: last ? stage : stage + 1, status: last ? "finished" : "intro", deadline: null };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, update]);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (remaining <= 0) lock();
  }, [remaining, lock]);

  const go = (i: number) => {
    const dt = takeElapsed();
    update((a) => {
      a.timeMs[stage][a.current[stage]] += dt;
      a.current[stage] = Math.max(0, Math.min(spec.count - 1, i));
      return a;
    });
  };

  const setAnswer = (ans: Answer) =>
    update((a) => {
      a.answers[stage][current] = ans;
      return a;
    });

  const answered = subItems.map(({ item }, i) =>
    isAnswered(attempt.answers[stage][i] ?? undefined, item.type === "equations" ? (item as EquationsItem).variables : undefined),
  );
  const { item } = subItems[current];
  const unanswered = answered.filter((x) => !x).length;

  return (
    <div className="flex h-screen flex-col">
      <ExamHeader remainingMs={remaining} subtests={test.subtests} stage={stage} onEnd={() => setConfirmEnd(true)} />
      <InstructionsBar
        open={showInstr}
        onToggle={() => setShowInstr((o) => !o)}
        heading={spec.instructions.heading}
        lines={spec.instructions.lines}
        zoom={zoom}
        onZoom={setZoom}
      />
      <main className="flex-1 overflow-auto px-4 pb-6 pt-10">
        <div style={{ zoom }}>
          <ItemView key={item.id} item={item} answer={attempt.answers[stage][current] ?? undefined} onAnswer={setAnswer} />
        </div>
      </main>
      <ExamFooter count={spec.count} current={current} answered={answered} onGo={go} />

      {confirmEnd && (
        <Dialog onClose={() => setConfirmEnd(false)}>
          <h2 className="text-lg font-bold">End {spec.title}?</h2>
          <p className="mt-2 text-sm text-zinc-600">
            {unanswered > 0
              ? `${unanswered} question${unanswered > 1 ? "s are" : " is"} still unanswered. `
              : ""}
            You still have {formatClock(remaining)} left. Once you end this subtest you cannot return to it.
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={() => setConfirmEnd(false)} className="rounded-md border px-4 py-2 text-sm">
              Keep working
            </button>
            <button
              type="button"
              onClick={() => {
                setConfirmEnd(false);
                lock();
              }}
              className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white"
            >
              End subtest
            </button>
          </div>
        </Dialog>
      )}
    </div>
  );
}
