"use client";

import type { PassageMcqItem } from "@/lib/exam/types";
import { PassageView } from "./PassageView";
import { RichText } from "./RichText";

const LETTERS = ["a", "b", "c", "d"];

type Q = { item: PassageMcqItem; answer: number | null | undefined };

/**
 * Exam screen for one Subject Module text: the text on the left,
 * all of its questions (7–8) in a scrollable side panel on the right.
 */
export function SubjectTextView({
  textNumber,
  textCount,
  questions,
  onAnswer,
}: {
  textNumber: number;
  textCount: number;
  questions: Q[];
  onAnswer: (questionIndexInText: number, option: number) => void;
}) {
  const passage = questions[0].item.passage;
  const answered = questions.filter((q) => q.answer != null).length;

  return (
    <div className="grid h-full min-h-0 grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <section className="min-h-0 overflow-y-auto border-r border-zinc-300 px-6 pb-8">
        <p className="pt-1 text-sm font-semibold text-zinc-500">
          Text {textNumber} of {textCount}
        </p>
        <PassageView passage={passage} />
      </section>

      <section className="min-h-0 overflow-y-auto bg-zinc-50 px-6 pb-8">
        <div className="sticky top-0 z-10 -mx-6 border-b border-zinc-200 bg-zinc-50 px-6 py-2 text-sm">
          <span className="font-semibold">Questions on text {textNumber}</span>{" "}
          <span className="ml-1 text-zinc-500">
            {answered} of {questions.length} answered
          </span>
        </div>
        <ol className="mt-4 space-y-6">
          {questions.map((q, qi) => (
            <li key={q.item.id} className="rounded-lg border border-zinc-200 bg-white p-4">
              <p className="text-[15px] leading-6">
                <span className="mr-1 font-bold text-brand">{q.item.number}.</span>
                <RichText text={q.item.stem} />
              </p>
              <div className="mt-3 flex flex-col gap-2" role="radiogroup" aria-label={`question ${q.item.number}`}>
                {q.item.options.map((opt, oi) => {
                  const chosen = q.answer === oi;
                  return (
                    <button
                      key={oi}
                      type="button"
                      role="radio"
                      aria-checked={chosen}
                      onClick={() => onAnswer(qi, oi)}
                      className={`flex items-start gap-3 rounded-md border px-3 py-2 text-left text-[14px] leading-6 transition ${
                        chosen ? "border-brand bg-brand-soft ring-2 ring-brand" : "border-zinc-300 hover:border-brand hover:bg-brand-soft"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold ${
                          chosen ? "border-brand bg-brand text-white" : "border-zinc-400"
                        }`}
                      >
                        {LETTERS[oi]}
                      </span>
                      <span>
                        <RichText text={opt} />
                      </span>
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
