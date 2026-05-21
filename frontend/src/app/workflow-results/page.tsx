import type { Metadata } from "next";
import WorkflowResultsPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Review workflow results",
  description: "Capture what happened, route failures, and prepare a clean handoff.",
};

export default function WorkflowResultsPage() {
  return <WorkflowResultsPageClient />;
}
