import type { Passage, PassageBlock } from "@/lib/exam/types";
import { RichText, Tex } from "./RichText";

const SERIES_COLORS = ["#8c0a55", "#3a7ca5"];

function Chart({ block }: { block: Extract<PassageBlock, { k: "chart" }> }) {
  const W = 520, H = 260, left = 52, right = 16, top = 16, bottom = 52;
  const plotW = W - left - right, plotH = H - top - bottom;
  const max = Math.max(...block.series.flatMap((s) => s.values));
  const step = max > 50 ? 20 : max > 20 ? 10 : 5;
  const yMax = Math.ceil(max / step) * step;
  const ticks = Array.from({ length: yMax / step + 1 }, (_, i) => i * step);
  const y = (v: number) => top + plotH - (v / yMax) * plotH;
  const band = plotW / block.categories.length;
  const cx = (i: number) => left + band * i + band / 2;

  return (
    <figure className="my-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[560px]" role="img" aria-label={block.caption}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={left} x2={W - right} y1={y(t)} y2={y(t)} stroke="#e4e4e7" />
            <text x={left - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#52525b">
              {t}
            </text>
          </g>
        ))}
        <line x1={left} x2={W - right} y1={y(0)} y2={y(0)} stroke="#71717a" />
        {block.categories.map((c, i) => (
          <text key={c} x={cx(i)} y={H - bottom + 16} textAnchor="middle" fontSize="11" fill="#3f3f46">
            {c}
          </text>
        ))}
        <text x={left + plotW / 2} y={H - 8} textAnchor="middle" fontSize="12" fill="#18181b">
          {block.xLabel}
        </text>
        <text
          x={14}
          y={top + plotH / 2}
          textAnchor="middle"
          fontSize="12"
          fill="#18181b"
          transform={`rotate(-90 14 ${top + plotH / 2})`}
        >
          {block.yLabel}
        </text>

        {block.kind === "bar" &&
          block.series.map((s, si) => {
            const bw = (band * 0.7) / block.series.length;
            return s.values.map((v, i) => (
              <rect
                key={`${si}-${i}`}
                x={cx(i) - (band * 0.7) / 2 + si * bw}
                y={y(v)}
                width={bw - 2}
                height={y(0) - y(v)}
                fill={SERIES_COLORS[si % SERIES_COLORS.length]}
              >
                <title>{`${s.name}, ${block.categories[i]}: ${v}`}</title>
              </rect>
            ));
          })}

        {block.kind === "line" &&
          block.series.map((s, si) => (
            <g key={si}>
              <polyline
                points={s.values.map((v, i) => `${cx(i)},${y(v)}`).join(" ")}
                fill="none"
                stroke={SERIES_COLORS[si % SERIES_COLORS.length]}
                strokeWidth="2"
              />
              {s.values.map((v, i) => (
                <circle key={i} cx={cx(i)} cy={y(v)} r="3.5" fill={SERIES_COLORS[si % SERIES_COLORS.length]}>
                  <title>{`${s.name}, ${block.categories[i]}: ${v}`}</title>
                </circle>
              ))}
            </g>
          ))}
      </svg>
      <div className="mt-1 flex flex-wrap gap-4 text-xs text-zinc-700">
        {block.series.map((s, si) => (
          <span key={s.name} className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: SERIES_COLORS[si % SERIES_COLORS.length] }} />
            {s.name}
          </span>
        ))}
      </div>
      <figcaption className="mt-1 text-sm italic text-zinc-600">{block.caption}</figcaption>
    </figure>
  );
}

function Block({ b }: { b: PassageBlock }) {
  switch (b.k) {
    case "h":
      return <h3 className="mt-5 font-semibold">{b.text}</h3>;
    case "p":
      return (
        <p className="my-3">
          <RichText text={b.text} />
        </p>
      );
    case "list":
      return (
        <ul className="my-3 list-disc space-y-1.5 pl-6">
          {b.items.map((it, i) => (
            <li key={i}>
              <RichText text={it} />
            </li>
          ))}
        </ul>
      );
    case "formula":
      return (
        <div className="my-3 flex items-center justify-center gap-6 overflow-x-auto">
          <Tex tex={b.tex} display />
          {b.label && <span className="text-sm text-zinc-500">{b.label}</span>}
        </div>
      );
    case "table":
      return (
        <figure className="my-4 overflow-x-auto">
          <figcaption className="mb-2 text-sm italic text-zinc-600">{b.caption}</figcaption>
          <table className="border-collapse text-sm">
            <thead>
              <tr>
                {b.head.map((h, i) => (
                  <th key={i} className="border border-zinc-300 bg-zinc-100 px-3 py-1.5 text-left font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j} className={`border border-zinc-300 px-3 py-1.5 ${j > 0 ? "text-right tabular-nums" : ""}`}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      );
    case "chart":
      return <Chart block={b} />;
  }
}

export function PassageView({ passage }: { passage: Passage }) {
  return (
    <article className="text-[15px] leading-7 text-zinc-900">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand">{passage.field}</p>
      <h2 className="mt-1 text-xl font-bold">{passage.title}</h2>
      {passage.blocks.map((b, i) => (
        <Block key={i} b={b} />
      ))}
    </article>
  );
}
