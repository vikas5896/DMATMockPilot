"use client";

import type { FigureSequenceAnswer, FigureSequenceItem } from "@/lib/exam/types";
import { FrameSvg } from "./FrameSvg";

type Props = {
  item: FigureSequenceItem;
  answer: FigureSequenceAnswer | undefined;
  onAnswer?: (a: FigureSequenceAnswer) => void;
  /** review mode: show correct options */
  correct?: [number, number];
};

const S = 84;

export function FigureSequenceView({ item, answer, onAnswer, correct }: Props) {
  const chosen: FigureSequenceAnswer = answer ?? [null, null];
  const choose = (slot: 0 | 1, idx: number) => {
    if (!onAnswer) return;
    const next: FigureSequenceAnswer = [...chosen];
    next[slot] = idx;
    onAnswer(next);
  };

  return (
    <div className="flex justify-center gap-[6px] pt-2">
      {item.shown.map((fr, i) => (
        <div key={i} className="self-start">
          <FrameSvg frame={fr} size={S} title={`picture ${i + 1}`} />
        </div>
      ))}
      {([0, 1] as const).map((slot) => (
        <div key={slot} className="flex flex-col items-center gap-2">
          <div
            className="flex items-center justify-center border-[1.5px] border-[#1f2328] bg-white text-2xl font-bold"
            style={{ width: S, height: S }}
            aria-label={`missing picture ${slot + 5}`}
          >
            ?
          </div>
          <svg width={S} height={30} viewBox="0 0 84 30" aria-hidden>
            <rect x={36} y={0} width={12} height={14} fill="#1f2328" />
            <polygon points="16,13 68,13 42,30" fill="#1f2328" />
          </svg>
          {item.options[slot].map((fr, idx) => {
            const isChosen = chosen[slot] === idx;
            const isRight = correct?.[slot] === idx;
            let ring = "ring-0";
            if (correct) {
              if (isRight) ring = "ring-4 ring-emerald-500";
              else if (isChosen) ring = "ring-4 ring-red-500";
            } else if (isChosen) ring = "ring-4 ring-brand";
            return (
              <button
                key={idx}
                type="button"
                disabled={!onAnswer}
                onClick={() => choose(slot, idx)}
                className={`${ring} rounded-sm transition-shadow hover:outline hover:outline-2 hover:outline-brand/40 disabled:hover:outline-none`}
                aria-pressed={isChosen}
                aria-label={`option ${idx + 1} for picture ${slot + 5}`}
              >
                <FrameSvg frame={fr} size={S} />
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
