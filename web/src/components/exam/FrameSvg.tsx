import type { FigColor, Figure, Frame } from "@/lib/exam/types";

const CELL = 20;
const GRID = 4;
export const FILL: Record<FigColor, string> = {
  green: "#1f8a5b",
  blue: "#2563eb",
  red: "#d43c3c",
  yellow: "#e8b20c",
};

function FigureShape({ f }: { f: Figure }) {
  const cx = f.col * CELL + CELL / 2;
  const cy = f.row * CELL + CELL / 2;
  const s = 6.5; // half size
  const common = { fill: FILL[f.color], stroke: "#1f2328", strokeWidth: 0.8 };
  let shape;
  switch (f.shape) {
    case "diamond":
      shape = <polygon points={`0,${-s} ${s},0 0,${s} ${-s},0`} {...common} />;
      break;
    case "circle":
      shape = <circle r={s - 1} {...common} />;
      break;
    case "square":
      shape = <rect x={-s + 1.5} y={-s + 1.5} width={2 * s - 3} height={2 * s - 3} {...common} />;
      break;
    case "triangle":
      shape = <polygon points={`0,${-s} ${s},${s - 1} ${-s},${s - 1}`} {...common} />;
      break;
    case "arrow":
      // points up at rot 0
      shape = (
        <polygon
          points={`0,${-s} ${s},-0.5 2.5,-0.5 2.5,${s} -2.5,${s} -2.5,-0.5 ${-s},-0.5`}
          {...common}
        />
      );
      break;
  }
  return <g transform={`translate(${cx} ${cy}) rotate(${f.rot})`}>{shape}</g>;
}

/** One 4×4 picture. */
export function FrameSvg({ frame, size = 80, title }: { frame: Frame | null; size?: number; title?: string }) {
  const px = GRID * CELL;
  return (
    <svg
      viewBox={`-1 -1 ${px + 2} ${px + 2}`}
      width={size}
      height={size}
      role="img"
      aria-label={title ?? "picture"}
      className="block bg-white"
    >
      {Array.from({ length: GRID + 1 }, (_, i) => (
        <g key={i} stroke="#1f2328" strokeWidth={i === 0 || i === GRID ? 1.2 : 0.6}>
          <line x1={0} x2={px} y1={i * CELL} y2={i * CELL} />
          <line y1={0} y2={px} x1={i * CELL} x2={i * CELL} />
        </g>
      ))}
      {frame?.map((f, i) => <FigureShape key={i} f={f} />)}
      {!frame && (
        <text x={px / 2} y={px / 2 + 7} textAnchor="middle" fontSize={20} fontWeight={700} fill="#1f2328">
          ?
        </text>
      )}
    </svg>
  );
}
