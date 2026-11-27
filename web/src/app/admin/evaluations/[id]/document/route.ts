import { currentAdmin } from "@/lib/auth";
import { safeFileName } from "@/lib/evaluation";
import { evaluationDocument } from "@/lib/evaluation-store";

/** The uploaded transcript, for admins only. Served inline, never cached; the type comes from the file bytes checked at upload. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await currentAdmin())) return new Response("Not found", { status: 404 });
  const id = Number((await params).id);
  if (!Number.isInteger(id)) return new Response("Not found", { status: 404 });
  const doc = await evaluationDocument(id);
  if (!doc) return new Response("Not found", { status: 404 });
  const type = ["application/pdf", "image/png", "image/jpeg"].includes(doc.type) ? doc.type : "application/octet-stream";
  return new Response(Buffer.from(doc.data), {
    headers: {
      "Content-Type": type,
      "Content-Disposition": `inline; filename="${safeFileName(doc.name)}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
      // browsers will not show a PDF inside a sandboxed response, so the sandbox is for images only
      ...(type.startsWith("image/") ? { "Content-Security-Policy": "sandbox; default-src 'none'" } : {}),
      "X-Frame-Options": "SAMEORIGIN",
      "X-Robots-Tag": "noindex",
    },
  });
}
