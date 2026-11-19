"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { childSeed } from "@/lib/rng";
import { buildSubtest } from "@/lib/generators";
import { isAnswered } from "@/lib/exam/scoring";
import { afterSubtest, TESTS, type Attempt } from "@/lib/exam/tests";
import { saveAttemptAction } from "@/app/test/actions";
import type { Answer, EquationsItem, PassageMcqItem } from "@/lib/exam/types";
import { SubjectTextView } from "@/components/subject/SubjectTextView";
import { BRAND } from "@/lib/brand";
import { Dialog, ExamFooter, ExamHeader, formatClock, InstructionsBar } from "./ExamChrome";
import { ItemView } from "./ItemView";
import { Results } from "./Results";

const noopSubscribe = () => () => {};

/**
 * Runs one test attempt. The attempt comes from the server (one per student and test) and is saved back
 * while the student works: debounced while answering, immediately when a section starts or ends.
 */
export function ExamRunner({ testId, testTitle, initial }: { testId: string; testTitle: string; initial: Attempt }) {
  const isClient = useSyncExternalStore(noopSubscribe, () => true, () => false);
  if (!isClient) return <div className="p-10 text-zinc-500">Preparing your test…</div>;
  return <AttemptView testId={testId} testTitle={testTitle} initial={initial} />;
}

function AttemptView({ testId, testTitle, initial }: { testId: string; testTitle: string; initial: Attempt }) {
  const [attempt, setAttempt] = useState<Attempt>(initial);
  const [saveError, setSaveError] = useState<string | null>(null);
  const test = TESTS[attempt.kind];
  const seed = attempt.seed;

  const items = useMemo(
    () => test.subtests.map((spec, i) => buildSubtest(spec, childSeed(seed, i + 1))),
    [seed, test.subtests],
  );

  const update = useCallback((fn: (a: Attempt) => Attempt) => {
    setAttempt((prev) => fn(structuredClone(prev)));
  }, []);

  // ---- saving to the server ----
  const pending = useRef<Attempt | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const last = useRef<Attempt>(initial);

  const flush = useCallback(async () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    const data = pending.current;
    if (!data) return;
    pending.current = null;
    try {
      const r = await saveAttemptAction(testId, data);
      setSaveError(r.ok ? null : (r.error ?? "Could not save your answers."));
    } catch {
      setSaveError("Could not save your answers. Check your internet connection.");
      pending.current = pending.current ?? data; // retry with the next change
    }
  }, [testId]);

  useEffect(() => {
    if (attempt === last.current) return;
    const important = attempt.status !== last.current.status || attempt.stage !== last.current.stage;
    last.current = attempt;
    pending.current = attempt;
    if (important) void flush();
    else {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => void flush(), 1500);
    }
  }, [attempt, flush]);

  useEffect(() => {
    const onHide = () => {
      if (document.visibilityState === "hidden") void flush();
    };
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, [flush]);

  const banner = saveError && (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-md bg-red-600 px-4 py-2 text-sm text-white shadow-lg">
      {saveError}
    </div>
  );

  if (attempt.status === "finished") {
    return (
      <>
        <Results attempt={attempt} items={items} title={testTitle} />
        {banner}
      </>
    );
  }

  const spec = test.subtests[attempt.stage];

  if (attempt.status === "break") {
    return (
      <BreakScreen
        attempt={attempt}
        onEnd={() => update((a) => ({ ...a, status: "intro", deadline: null }))}
      />
    );
  }

  if (attempt.status === "intro") {
    return (
      <div className="flex min-h-screen flex-col">
        <ExamHeader remainingMs={spec.timeSec * 1000} subtests={test.subtests} stage={attempt.stage} />
        <main className="mx-auto max-w-2xl flex-1 px-6 py-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            {testTitle} · Part {attempt.stage + 1} of {test.subtests.length}
          </p>
          <h1 className="mt-1 text-3xl font-bold">{spec.title}</h1>
          <p className="mt-2 text-zinc-600">
            {spec.count} {spec.module === "subject" ? "questions" : "tasks"} · {spec.timeSec / 60} minutes
          </p>
          {spec.module === "subject" && spec.count < 60 && (
            <p className="mt-3 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
              Practice set: {spec.count} questions in {spec.timeSec / 60} minutes, the same 1.5 minutes per question as
              the real module (about 60 questions in 90 minutes). More texts are being added.
            </p>
          )}
          <div className="mt-6 space-y-2 rounded-lg border border-zinc-200 bg-zinc-50 p-5 text-[15px] leading-7">
            <p className="font-semibold">{spec.instructions.heading}</p>
            {spec.instructions.lines.map((l, i) => (
              <p key={i}>{l}</p>
            ))}
          </div>
          <ul className="mt-6 list-disc space-y-1 pl-5 text-sm text-zinc-600">
            <li>The timer starts when you click Start and keeps running if you close the page.</li>
            <li>You can take this test only once. Your answers are saved as you go, so you can continue on another device.</li>
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
            <Link href="/account" className="underline">
              Back to my tests
            </Link>{" "}
            · {BRAND.name} is an independent practice platform, not affiliated with g.a.s.t.
          </p>
        </main>
      </div>
    );
  }

  return (
    <>
      <RunningSubtest attempt={attempt} items={items} update={update} />
      {banner}
    </>
  );
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
      return afterSubtest(a, t);
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

  const setAnswerAt = (index: number, ans: Answer) =>
    update((a) => {
      a.answers[stage][index] = ans;
      return a;
    });
  const setAnswer = (ans: Answer) => setAnswerAt(current, ans);

  // Subject Module: questions grouped by text; the footer navigates texts 1–10
  const isSubject = spec.itemType === "passage-mcq";
  const texts: { id: string; indices: number[] }[] = [];
  if (isSubject) {
    subItems.forEach(({ item: it }, i) => {
      const id = it.type === "passage-mcq" ? it.passage.id : "";
      const last = texts.at(-1);
      if (last && last.id === id) last.indices.push(i);
      else texts.push({ id, indices: [i] });
    });
  }
  const currentText = isSubject ? Math.max(0, texts.findIndex((t) => t.indices.includes(current))) : 0;

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
      {isSubject ? (
        <main className="min-h-0 flex-1 overflow-hidden pt-8" style={{ zoom }}>
          <SubjectTextView
            key={texts[currentText].id}
            textNumber={currentText + 1}
            textCount={texts.length}
            questions={texts[currentText].indices.map((i) => ({
              item: subItems[i].item as PassageMcqItem,
              answer: attempt.answers[stage][i] as number | null,
            }))}
            onAnswer={(qi, option) => setAnswerAt(texts[currentText].indices[qi], option)}
          />
        </main>
      ) : (
        <main className="flex-1 overflow-auto px-4 pb-6 pt-10">
          <div style={{ zoom }}>
            <ItemView key={item.id} item={item} answer={attempt.answers[stage][current] ?? undefined} onAnswer={setAnswer} />
          </div>
        </main>
      )}
      {isSubject ? (
        <ExamFooter
          count={texts.length}
          current={currentText}
          answered={texts.map((t) => t.indices.every((i) => answered[i]))}
          onGo={(p) => go(texts[p].indices[0])}
          itemLabel="text"
        />
      ) : (
        <ExamFooter count={spec.count} current={current} answered={answered} onGo={go} />
      )}

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

function BreakScreen({ attempt, onEnd }: { attempt: Attempt; onEnd: () => void }) {
  const test = TESTS[attempt.kind];
  const [now, setNow] = useState(() => Date.now());
  const remaining = (attempt.deadline ?? 0) - now;
  const ended = useRef(false);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (remaining <= 0 && !ended.current) {
      ended.current = true;
      onEnd();
    }
  }, [remaining, onEnd]);

  return (
    <div className="flex min-h-screen flex-col">
      <ExamHeader remainingMs={remaining} subtests={test.subtests} stage={attempt.stage} />
      <main className="mx-auto max-w-xl flex-1 px-6 py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">Break</p>
        <h1 className="mt-2 text-3xl font-bold">Core Module finished</h1>
        <p className="mt-4 text-zinc-600">
          In the real exam there is a 30-minute break before the Subject Module. Stretch, drink some water, rest your
          eyes. The Subject Module starts when the break ends.
        </p>
        <p className="mt-8 text-6xl font-bold tabular-nums text-brand">{formatClock(remaining)}</p>
        <button
          type="button"
          onClick={() => {
            ended.current = true;
            onEnd();
          }}
          className="mt-10 rounded-md border border-brand px-6 py-3 font-semibold text-brand hover:bg-brand-soft"
        >
          Skip the break and continue
        </button>
      </main>
    </div>
  );
}
