import { getDb } from "@/db";
import { leads } from "@/db/schema";
import { validateLead, type LeadInput } from "@/lib/leads";

/** Saves website enquiries (live-class registrations, consultancy waitlist, contact) to the database. */
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

  try {
    const db = await getDb();
    await db.insert(leads).values({
      name: body.name!.trim(),
      email: body.email!.trim().toLowerCase(),
      phone: body.phone?.trim() || null,
      interest: body.interest!,
      batch: body.batch || null,
      message: body.message?.trim() || null,
    });
  } catch (e) {
    console.error("could not save lead", e);
    return Response.json(
      { ok: false, error: "Sorry, we could not save your request. Please try again later." },
      { status: 500 },
    );
  }
  return Response.json({ ok: true });
}
