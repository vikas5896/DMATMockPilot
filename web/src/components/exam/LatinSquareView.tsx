"use client";

import type { LatinLetter, LatinSquareAnswer, LatinSquareItem } from "@/lib/exam/types";
import { LETTERS } from "@/lib/generators/latinSquare";

type Props = {
  item: LatinSquareItem;
  answer: LatinSquareAnswer | undefined;
  onAnswer?: (a: LatinLetter) => void;
  correct?: LatinLetter;
};

const CELL = "h-[64px] w-[64px] border border-zinc-500 flex items-center justify-center text-[26px] font-bold";

export function LatinSquareView({ item, answer, onAnswer, correct }: Props) {
  return (
    <div className="flex justify-center gap-28 pt-2">
      <section>
        <h3 className="mb-3 text-center text-[22px]">square</h3>
        <div className="grid grid-cols-5">
          {item.grid.flatMap((row, r) =>
            row.map((cell, c) => {
              const isTarget = r === item.target.row && c === item.target.col;
              return (
                <div key={`${r}-${c}`} className={CELL}>
                  {isTarget ? <span className="text-brand">?</span> : cell}
                </div>
              );
            }),
          )}
        </div>
      </section>
      <section>
        <h3 className="mb-3 text-center text-[22px]">answer column</h3>
        <div className="flex flex-col">
          {LETTERS.map((l) => {
            const isChosen = answer === l;
            let cls = "hover:bg-brand-soft";
            if (correct) {
              cls = l === correct ? "bg-emerald-100 ring-4 ring-inset ring-emerald-500" : isChosen ? "bg-red-50 ring-4 ring-inset ring-red-500" : "";
            } else if (isChosen) cls = "bg-brand text-white";
            return (
              <button
                key={l}
                type="button"
                disabled={!onAnswer}
                onClick={() => onAnswer?.(l)}
                className={`${CELL} ${cls} -mt-px first:mt-0`}
                aria-pressed={isChosen}
              >
                {l}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
