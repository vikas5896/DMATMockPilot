"use client";

import type { ReactNode } from "react";
import type { SubtestSpec } from "@/lib/exam/types";
import { BRAND } from "@/lib/brand";

export function formatClock(ms: number) {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

export function ExamHeader({
  remainingMs,
  subtests,
  stage,
  onEnd,
}: {
  remainingMs: number;
  subtests: SubtestSpec[];
  stage: number;
  onEnd?: () => void;
}) {
  const low = remainingMs < 5 * 60 * 1000;
  return (
    <header className="flex items-center gap-8 bg-brand px-4 py-3 text-white">
      <div
        className={`flex items-center gap-2 rounded-full border-2 border-white px-4 py-1.5 text-[17px] tabular-nums ${
          low ? "bg-amber-300 text-black" : "bg-white text-black"
        }`}
        role="timer"
        aria-live="off"
        aria-label="time remaining"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
          <circle cx="8" cy="8" r="7.5" fill="currentColor" />
          <path d="M8 4v4.5l3 1.5" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
        {formatClock(remainingMs)}
      </div>

      {(["core", "subject"] as const).map((mod) => {
        const indexed = subtests.map((s, i) => ({ s, i })).filter(({ s }) => s.module === mod);
        const active = subtests[stage]?.module === mod;
        const fallback = mod === "core" ? "Figure Sequences · Equations · Latin Squares" : "General Academic Module";
        return (
          <div key={mod} className={active ? "" : "opacity-50"}>
            <div className="mb-1 flex h-3 items-end gap-1.5">
              {(indexed.length ? indexed : [{ s: null, i: -1 }]).map(({ s, i }) => (
                <span
                  key={s?.key ?? mod}
                  className={`block rounded-sm ${i === stage ? "h-3 w-6 bg-white" : "h-[5px] w-6 bg-white/50"}`}
                  title={s?.title}
                />
              ))}
            </div>
            <p className="text-[15px] font-semibold leading-tight">{mod === "core" ? "Core Module" : "Subject Module"}</p>
            <p className="text-[11px] leading-tight">{active ? subtests[stage].title : fallback}</p>
          </div>
        );
      })}

      <div className="flex-1" />
      {onEnd && (
        <button
          type="button"
          onClick={onEnd}
          className="rounded-md border-[3px] border-accent bg-white px-4 py-1.5 text-sm font-semibold text-black hover:bg-zinc-100"
        >
          End Subtest
        </button>
      )}
    </header>
  );
}

export function InstructionsBar({
  open,
  onToggle,
  heading,
  lines,
  zoom,
  onZoom,
}: {
  open: boolean;
  onToggle: () => void;
  heading: string;
  lines: string[];
  zoom: number;
  onZoom: (z: number) => void;
}) {
  return (
    <div className="relative border-b border-zinc-200 bg-zinc-50">
      {open && (
        <div className="px-4 pt-3 text-[13px] leading-6">
          <p className="font-semibold">{heading}</p>
          {lines.map((l, i) => (
            <p key={i}>{l}</p>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={onToggle}
        className="mx-auto block px-6 py-1 text-zinc-600 hover:text-black"
        aria-label={open ? "hide instructions" : "show instructions"}
      >
        <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden className={open ? "" : "rotate-180"}>
          <path d="M2 5l5-4 5 4M2 9l5-4 5 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </button>
      <div className="absolute -bottom-5 right-4 z-10 flex gap-1.5">
        <button
          type="button"
          onClick={onToggle}
          title="Instructions"
          className="flex h-9 w-9 items-center justify-center rounded-md border-2 border-brand bg-white"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
            <rect x="2" y="1.5" width="14" height="15" fill="none" stroke="#1f2328" strokeWidth="1.3" />
            {[5, 8, 11, 14].map((y) => (
              <line key={y} x1="4.5" x2="13.5" y1={y} y2={y} stroke="#1f2328" strokeWidth="1.2" />
            ))}
          </svg>
        </button>
        <div className="flex h-9 items-center gap-1 rounded-md border-2 border-brand bg-white px-1">
          {[
            { z: 0.9, cls: "text-xs" },
            { z: 1, cls: "text-base" },
            { z: 1.15, cls: "text-xl" },
          ].map(({ z, cls }) => (
            <button
              key={z}
              type="button"
              onClick={() => onZoom(z)}
              aria-pressed={zoom === z}
              aria-label={`text size ${z}`}
              className={`flex h-7 w-7 items-center justify-center rounded font-bold ${cls} ${
                zoom === z ? "bg-brand text-white" : "text-brand"
              }`}
            >
              A
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ExamFooter({
  count,
  current,
  answered,
  onGo,
  itemLabel = "question",
}: {
  count: number;
  current: number;
  answered: boolean[];
  onGo: (i: number) => void;
  /** what one palette number stands for, for screen readers ("question" or "text") */
  itemLabel?: string;
}) {
  const nav = "flex items-center gap-2 rounded-md bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-40";
  return (
    <footer className="flex items-center gap-3 border-t border-zinc-200 bg-white px-4 py-3">
      <span className="mr-2 text-sm font-semibold text-brand">{BRAND.name}</span>
      <button type="button" className={nav} disabled={current === 0} onClick={() => onGo(current - 1)}>
        ← Save and back
      </button>
      <div className="flex flex-1 flex-wrap justify-center gap-1">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onGo(i)}
            aria-current={i === current}
            aria-label={`${itemLabel} ${i + 1}${answered[i] ? ", answered" : ""}`}
            className={`h-8 w-8 rounded text-xs font-semibold ${
              i === current
                ? "border-2 border-brand bg-white text-brand"
                : answered[i]
                  ? "bg-brand text-white"
                  : "bg-brand-soft text-brand"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button type="button" className={nav} disabled={current === count - 1} onClick={() => onGo(current + 1)}>
        Save and forward →
      </button>
    </footer>
  );
}

export function Dialog({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        className="w-[420px] rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
