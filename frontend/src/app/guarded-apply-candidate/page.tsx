import type { Metadata } from "next";
import GuardedApplyCandidatePageClient from "./page-client";

export const metadata: Metadata = {
  title: "Guarded Apply Candidate",
  description: "Plan the smallest safe guarded apply candidate path without enabling execution.",
};

export default function GuardedApplyCandidatePage() {
  return <GuardedApplyCandidatePageClient />;
}
