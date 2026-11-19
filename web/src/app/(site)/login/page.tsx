import { redirect } from "next/navigation";
import { Suspense } from "react";
import { currentStudent } from "@/lib/auth";
import { pageMetadata } from "@/lib/seo";
import { safeNext } from "@/lib/safe-next";
import { StudentLoginForm } from "./StudentLoginForm";

export const metadata = {
  ...pageMetadata({
    title: "Log in or sign up",
    description: "Sign up free with your email to take the free dMAT mock tests and track your results.",
    path: "/login",
  }),
  robots: { index: false, follow: true },
};

type Props = { searchParams: Promise<{ [k: string]: string | string[] | undefined }> };

export default function LoginPage(props: Props) {
  return (
    <section className="bg-zinc-50">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-14 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">Free account</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Log in or sign up to take your mock tests</h1>
          <ul className="mt-6 space-y-2 text-zinc-700">
            <li>✓ Free full dMAT mock test, plus one free test for every section</li>
            <li>✓ Your answers saved as you go, on any device</li>
            <li>✓ Scores and step-by-step solutions after every test</li>
            <li>✓ More full mocks and section tests with a paid pack</li>
          </ul>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <Suspense fallback={<p className="text-zinc-500">Loading…</p>}>
            <LoginInner {...props} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

async function LoginInner({ searchParams }: Props) {
  const next = safeNext((await searchParams).next);
  const me = await currentStudent();
  if (me?.name && me.phone) redirect(next);
  return <StudentLoginForm next={next} startAtProfile={!!me} email={me?.email} />;
}
