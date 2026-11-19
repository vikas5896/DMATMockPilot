import Link from "next/link";
import { formatRange, type Batch } from "@/content/site/batches";
import { Badge } from "./ui";

export function statusBadge(b: Batch) {
  if (b.status === "full") return <Badge tone="zinc">Batch full</Badge>;
  if (b.status === "soon") return <Badge tone="amber">Opening soon</Badge>;
  return <Badge tone="green">Registrations open</Badge>;
}

export function BatchCard({ b }: { b: Batch }) {
  return (
    <Link
      href={`/live-classes/${b.slug}`}
      className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-6 transition hover:border-brand hover:shadow-sm"
    >
      <div className="flex flex-wrap items-center gap-2">
        {statusBadge(b)}
        <Badge tone="zinc">{b.kind === "webinar" ? "Free webinar" : b.kind === "masterclass" ? "Masterclass" : "Course"}</Badge>
        {b.forSitting && <span className="text-xs text-zinc-500">For the {b.forSitting}</span>}
      </div>
      <h3 className="mt-3 text-xl font-bold">{b.title}</h3>
      <p className="mt-2 flex-1 text-zinc-600">{b.summary}</p>
      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
        <dt className="text-zinc-500">Dates</dt>
        <dd>{formatRange(b.start, b.end)}</dd>
        <dt className="text-zinc-500">Schedule</dt>
        <dd>
          {b.days}, {b.time}
        </dd>
        <dt className="text-zinc-500">Sessions</dt>
        <dd>
          {b.sessions} × {b.sessionLength}
        </dd>
        <dt className="text-zinc-500">Fee</dt>
        <dd>{b.fee ?? "Announced soon"}</dd>
      </dl>
      <p className="mt-5 font-semibold text-brand group-hover:underline">Details and registration →</p>
    </Link>
  );
}
