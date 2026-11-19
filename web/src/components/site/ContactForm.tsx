"use client";

import { useSearchParams } from "next/navigation";
import { INTERESTS, type Interest } from "@/lib/leads";
import { LeadForm } from "./LeadForm";

/** Contact form that pre-selects the topic from ?interest=… in the URL. */
export function ContactForm() {
  const param = useSearchParams().get("interest");
  const interest: Interest = param && param in INTERESTS ? (param as Interest) : "other";
  return <LeadForm key={interest} defaultInterest={interest} submitLabel="Send message" />;
}
