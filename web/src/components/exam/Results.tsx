"use client";

import Link from "next/link";
import { useState } from "react";
import { isCorrect, scoreSubtest } from "@/lib/exam/scoring";
import { TESTS, type Attempt } from "@/lib/exam/tests";
import type { GeneratedItem } from "@/lib/exam/types";
import { BRAND } from "@/lib/brand";
import { formatClock } from "./ExamChrome";
import { ItemView } from "./ItemView";

const DIFF_LABEL = { low: "Easy", medium: "Medium", high: "Hard" } as const;

export function Results({
  attempt,
  items,
  title,
}: {
  attempt: Attempt;
  items: GeneratedItem[][];
  title: string;
}) {
  const test = TESTS[attempt.kind];
  const scores = test.subtests.map((_, s) =>
    scoreSubtest(
      items[s].map((g) => g.key),
      attempt.answers[s].map((a) => a ?? undefined),
    ),
  );
  const total = scores.reduce((n, s) => n + s.correct, 0);
  const max = scores.reduce((n, s) => n + s.total, 0);
  const modules = (["core", "subject"] as const)
    .map((mod) => {
      const idx = test.subtests.map((s, i) => (s.module === mod ? i : -1)).filter((i) => i >= 0);
      return {
        name: mod === "core" ? "Core Module" : "Subject Module",
        correct: idx.reduce((n, i) => n + scores[i].correct, 0),
        total: idx.reduce((n, i) => n + scores[i].total, 0),
      };
    })
    .filter((m) => m.total > 0);
  const [open, setOpen] = useState<{ s: number; i: number } | null>(null);

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-brand px-6 py-4 text-white">
        <Link href="/" className="font-semibold">
          {BRAND.name}
        </Link>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">Your result</p>
        <h1 className="mt-1 text-3xl font-bold">{title}</h1>
        <p className="mt-3 text-5xl font-bold tabular-nums">
          {total}
          <span className="text-2xl text-zinc-400"> / {max}</span>
        </p>
        <p className="mt-1 text-sm text-zinc-500">
          Raw score: one point per fully correct task, no negative marking. The real dMAT reports a scaled
          score; ours will follow once we have enough data to calibrate it.
        </p>
        {modules.length > 1 && (
          <div className="mt-4 flex gap-6 text-sm">
            {modules.map((m) => (
              <p key={m.name}>
                <span className="text-zinc-500">{m.name}: </span>
                <span className="font-semibold tabular-nums">
                  {m.correct} / {m.total}
                </span>
              </p>
            ))}
          </div>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {test.subtests.map((spec, s) => (
            <div key={spec.key} className="rounded-lg border border-zinc-200 bg-white p-5">
              <p className="text-sm text-zinc-500">{spec.title}</p>
              <p className="mt-1 text-2xl font-bold tabular-nums">
                {scores[s].correct} / {scores[s].total}
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                {scores[s].answered} answered · {formatClock(attempt.usedMs[s])} used of {spec.timeSec / 60}:00
              </p>
              <div className="mt-3 flex gap-2 text-xs">
                {(["low", "medium", "high"] as const).map((d) => {
                  const idx = spec.difficultyPlan.map((x, i) => (x === d ? i : -1)).filter((i) => i >= 0);
                  const ok = idx.filter((i) => isCorrect(items[s][i].key, attempt.answers[s][i] ?? undefined)).length;
                  return (
                    <span key={d} className="rounded bg-zinc-100 px-2 py-1">
                      {DIFF_LABEL[d]} {ok}/{idx.length}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-3">
          <Link href="/account" className="rounded-md bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-dark">
            Back to my tests
          </Link>
          <Link href="/mock-tests" className="rounded-md border border-zinc-300 bg-white px-6 py-3 font-semibold">
            All mock tests
          </Link>
        </div>

        <h2 className="mt-12 text-xl font-bold">Review every task</h2>
        {test.subtests.map((spec, s) => (
          <section key={spec.key} className="mt-6">
            <h3 className="mb-2 font-semibold">{spec.title}</h3>
            <div className="flex flex-wrap gap-1.5">
              {items[s].map((g, i) => {
                const ans = attempt.answers[s][i] ?? undefined;
                const ok = isCorrect(g.key, ans);
                const isOpen = open?.s === s && open?.i === i;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setOpen(isOpen ? null : { s, i })}
                    className={`h-9 w-9 rounded text-sm font-semibold ${
                      ok ? "bg-emerald-100 text-emerald-800" : ans == null ? "bg-zinc-200 text-zinc-600" : "bg-red-100 text-red-800"
                    } ${isOpen ? "ring-2 ring-brand" : ""}`}
                    title={ok ? "correct" : ans == null ? "not answered" : "wrong"}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
            {open?.s === s && (
              <div className="mt-4 rounded-lg border border-zinc-200 bg-white p-6">
                <p className="mb-4 text-sm text-zinc-500">
                  Task {open.i + 1} · {DIFF_LABEL[items[s][open.i].item.difficulty]} ·{" "}
                  {Math.round(attempt.timeMs[s][open.i] / 1000)} s spent
                </p>
                <ItemView
                  item={items[s][open.i].item}
                  answer={attempt.answers[s][open.i] ?? undefined}
                  reviewKey={items[s][open.i].key}
                />
                <div className="mt-6 rounded-md bg-brand-soft p-4 text-[15px]">
                  <p className="font-semibold">Solution</p>
                  <p className="mt-1">{items[s][open.i].item.explanation}</p>
                </div>
              </div>
            )}
          </section>
        ))}
        <p className="mt-12 text-xs text-zinc-400">
          {BRAND.name} is an independent practice platform and is not affiliated with g.a.s.t. or APS India.
        </p>
      </main>
    </div>
  );
}
