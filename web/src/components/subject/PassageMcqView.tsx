"use client";

import type { PassageMcqItem } from "@/lib/exam/types";
import { PassageView } from "./PassageView";
import { RichText } from "./RichText";

const LETTERS = ["a", "b", "c", "d"];

type Props = {
  item: PassageMcqItem;
  answer: number | null | undefined;
  onAnswer?: (a: number) => void;
  correct?: number;
  /** total questions for this text, shown as "Question 3 of 8" */
  ofTotal?: number;
};

/** Split screen: text on the left (scrolls on its own), question on the right. */
export function PassageMcqView({ item, answer, onAnswer, correct, ofTotal }: Props) {
  return (
    <div className="grid min-h-0 grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-0">
      <section className="max-h-[calc(100vh-260px)] min-h-[320px] overflow-y-auto border-r border-zinc-300 pr-6">
        <PassageView passage={item.passage} />
      </section>
      <section className="pl-6">
        <p className="text-sm font-semibold text-zinc-500">
          {item.passage.title} · Question {item.number}
          {ofTotal ? ` of ${ofTotal}` : ""}
        </p>
        <p className="mt-2 text-[16px] leading-7">
          <RichText text={item.stem} />
        </p>
        <div className="mt-5 flex flex-col gap-2.5" role="radiogroup">
          {item.options.map((opt, i) => {
            const chosen = answer === i;
            let cls = "border-zinc-300 hover:border-brand hover:bg-brand-soft";
            if (correct != null) {
              cls =
                i === correct
                  ? "border-emerald-500 bg-emerald-50"
                  : chosen
                    ? "border-red-500 bg-red-50"
                    : "border-zinc-200";
            } else if (chosen) cls = "border-brand bg-brand-soft ring-2 ring-brand";
            return (
              <button
                key={i}
                type="button"
                role="radio"
                aria-checked={chosen}
                disabled={!onAnswer}
                onClick={() => onAnswer?.(i)}
                className={`flex items-start gap-3 rounded-md border px-4 py-3 text-left text-[15px] leading-6 transition ${cls}`}
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                    chosen && correct == null ? "border-brand bg-brand text-white" : "border-zinc-400"
                  }`}
                >
                  {LETTERS[i]}
                </span>
                <span>
                  <RichText text={opt} />
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
