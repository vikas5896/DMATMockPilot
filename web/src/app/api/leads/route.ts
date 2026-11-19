import { appendFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { validateLead, type LeadInput } from "@/lib/leads";

/**
 * Saves website enquiries. For now each one is appended to data/leads.jsonl (git-ignored),
 * which works on your own computer or a server. On serverless hosting (e.g. Vercel) the file system
 * is read-only: replace this with the database in the accounts phase.
 */
export async function POST(request: Request) {
  let body: Partial<LeadInput>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // bots fill the hidden field: pretend success, store nothing
  if (body.website) return Response.json({ ok: true });

  const error = validateLead(body);
  if (error) return Response.json({ ok: false, error }, { status: 400 });

  const lead = {
    receivedAt: new Date().toISOString(),
    name: body.name!.trim(),
    email: body.email!.trim().toLowerCase(),
    phone: body.phone?.trim() || undefined,
    interest: body.interest,
    batch: body.batch || undefined,
    message: body.message?.trim() || undefined,
  };

  try {
    const dir = join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    await appendFile(join(dir, "leads.jsonl"), JSON.stringify(lead) + "\n", "utf8");
  } catch (e) {
    console.error("could not save lead", e);
    return Response.json({ ok: false, error: "Sorry, we could not save your request. Please try again later." }, { status: 500 });
  }
  return Response.json({ ok: true });
}
