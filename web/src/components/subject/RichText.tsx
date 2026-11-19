import katex from "katex";
import { Fragment, type ReactNode } from "react";

/** Render TeX to HTML. Content is our own authored material, so injecting KaTeX output is safe. */
export function Tex({ tex, display = false }: { tex: string; display?: boolean }) {
  const html = katex.renderToString(tex, { displayMode: display, throwOnError: false, output: "html" });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

/** **bold** and *italic* inside a plain-text chunk */
function emphasis(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(m[1] ? <strong key={`${keyBase}-b${i}`}>{m[1]}</strong> : <em key={`${keyBase}-i${i}`}>{m[2]}</em>);
    last = m.index + m[0].length;
    i++;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Plain text with inline math between $…$, **bold** and *italic*. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\$[^$]+\$)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("$") && part.endsWith("$") && part.length > 1 ? (
          <Tex key={i} tex={part.slice(1, -1)} />
        ) : (
          <Fragment key={i}>{emphasis(part, String(i))}</Fragment>
        ),
      )}
    </>
  );
}
