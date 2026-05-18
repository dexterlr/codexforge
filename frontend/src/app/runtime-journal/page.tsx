import type { Metadata } from "next";
import { buildRuntimeEventJournalFeed } from "@/lib/codexforge/runtime-event-journal";
import RuntimeJournalPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Runtime Event Journal",
  description:
    "CodexForge read-only Runtime Event Journal for requests, approvals, policy, validation, dry-runs, reducer previews, results, and audit handoffs.",
};

export default function RuntimeJournalPage() {
  const initialData = buildRuntimeEventJournalFeed();
  return <RuntimeJournalPageClient initialData={initialData} />;
}
