"use client";

import { useRef, useState } from "react";
import type { EquationsAnswer, EquationsItem } from "@/lib/exam/types";

type Props = {
  item: EquationsItem;
  answer: EquationsAnswer | undefined;
  onAnswer?: (a: EquationsAnswer) => void;
  correct?: Record<string, number>;
};

const KEYS = ["7", "8", "9", "4", "5", "6", "1", "2", "3"];

export function EquationsView({ item, answer, onAnswer, correct }: Props) {
  const values: EquationsAnswer = answer ?? {};
  const [focus, setFocus] = useState<string>(item.variables[0]);
  const refs = useRef<Record<string, HTMLInputElement | null>>({});

  const set = (v: string, text: string) => {
    if (!onAnswer) return;
    const clean = text.replace(/\D/g, "").slice(0, 2);
    onAnswer({ ...values, [v]: clean });
  };
  const press = (k: string) => {
    if (!onAnswer) return;
    const cur = values[focus] ?? "";
    set(focus, k === "del" ? cur.slice(0, -1) : cur + k);
    refs.current[focus]?.focus();
  };

  return (
    <div className="grid grid-cols-3 pt-2 text-[22px]">
      <section className="border-r border-zinc-500 px-6 pb-16">
        <h3 className="mb-6 text-center text-[22px]">equations</h3>
        <div className="space-y-5 pl-[20%]">
          {item.equations.map((eq, i) => (
            <p key={i} className="whitespace-nowrap">
              {eq}
            </p>
          ))}
        </div>
      </section>

      <section className="border-r border-zinc-500 px-6">
        <h3 className="mb-6 text-center text-[22px]">solutions</h3>
        <div className="flex flex-col items-center gap-5">
          {item.variables.map((v) => {
            const ok = correct ? Number(values[v]) === correct[v] : null;
            return (
              <label key={v} className="flex items-center gap-3">
                <span className="w-6 text-right">{v}</span>
                <span>=</span>
                <input
                  ref={(el) => {
                    refs.current[v] = el;
                  }}
                  inputMode="numeric"
                  value={values[v] ?? ""}
                  placeholder={onAnswer ? "click here" : ""}
                  readOnly={!onAnswer}
                  onFocus={() => setFocus(v)}
                  onChange={(e) => set(v, e.target.value)}
                  className={`h-12 w-36 rounded-md border px-2 text-[20px] outline-none placeholder:text-zinc-400 ${
                    focus === v && onAnswer ? "border-brand ring-2 ring-brand/30" : "border-zinc-400"
                  } ${ok === true ? "border-emerald-500 bg-emerald-50" : ""} ${ok === false ? "border-red-500 bg-red-50" : ""}`}
                  aria-label={`value of ${v}`}
                />
                {correct && ok === false && (
                  <span className="text-base text-emerald-700">correct: {correct[v]}</span>
                )}
              </label>
            );
          })}
        </div>
      </section>

      <section className="px-6">
        <h3 className="mb-6 text-center text-[22px]">virtual keyboard</h3>
        <div className="mx-auto w-[200px] rounded-sm border border-zinc-400 p-2">
          <button
            type="button"
            disabled={!onAnswer}
            onClick={() => press("del")}
            className="mb-2 flex h-9 w-full items-center justify-between border border-zinc-400 px-3 text-lg hover:bg-zinc-100"
          >
            <span aria-hidden className="text-zinc-400">⇦</span>
            <span>delete</span>
          </button>
          <div className="grid grid-cols-3 gap-2">
            {KEYS.map((k) => (
              <button
                key={k}
                type="button"
                disabled={!onAnswer}
                onClick={() => press(k)}
                className="h-9 border border-zinc-400 text-lg hover:bg-zinc-100"
              >
                {k}
              </button>
            ))}
            <button
              type="button"
              disabled={!onAnswer}
              onClick={() => press("0")}
              className="col-span-3 h-9 border border-zinc-400 text-lg hover:bg-zinc-100"
            >
              0
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
