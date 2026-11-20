import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AdminShell, Loading } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/auth";
import { batchToFields, type BatchFields } from "@/lib/batch-form";
import { getStoredBatch } from "@/lib/batch-store";
import { BatchForm } from "./BatchForm";

export const metadata = { title: "Edit batch" };
type Params = Promise<{ slug: string }>;

const EMPTY: BatchFields = {
  slug: "",
  title: "",
  kind: "course",
  summary: "",
  forSitting: "",
  start: "",
  end: "",
  days: "",
  time: "",
  sessions: "12",
  sessionLength: "90 min",
  fee: "",
  priceInr: "",
  instructor: "",
  status: "soon",
  includes: "",
  syllabus: "",
  sort: "100",
  published: false,
};

export default function EditBatchPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={<Loading />}>
      <Edit params={params} />
    </Suspense>
  );
}

async function Edit({ params }: { params: Params }) {
  const email = await requireAdmin();
  const { slug } = await params;
  const isNew = slug === "new";
  const existing = isNew ? null : await getStoredBatch(slug);
  if (!isNew && !existing) notFound();

  return (
    <AdminShell email={email} active="/admin/batches" title={isNew ? "New batch" : `Edit: ${existing!.title}`}>
      <BatchForm initial={existing ? batchToFields(existing) : EMPTY} originalSlug={existing?.slug} />
    </AdminShell>
  );
}
