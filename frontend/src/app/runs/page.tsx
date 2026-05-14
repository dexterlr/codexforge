import type { Metadata } from "next";
import { buildRunQueue } from "@/lib/codexforge/operator-run";
import RunsPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Operator Run Center",
  description:
    "CodexForge Operator Run Center for preview-only run queues, approval boundaries, artifact ledgers, timelines, and replay packets.",
};

export default function RunsPage() {
  const initialData = buildRunQueue();
  return <RunsPageClient initialData={initialData} />;
}
