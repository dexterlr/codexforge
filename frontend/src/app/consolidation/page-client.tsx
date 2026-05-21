"use client";

import { ConsolidationOverview } from "@/lib/codexforge/consolidation/components";
import type { ConsolidationSummary } from "@/lib/codexforge/consolidation";

type ConsolidationPageClientProps = {
  initialData: ConsolidationSummary;
};

export default function ConsolidationPageClient({ initialData }: ConsolidationPageClientProps) {
  return (
    <div style={{ minWidth: 0, width: "100%" }}>
      <span hidden data-codexforge-consolidation-real-coding-flow="Consolidation references One Real End-to-End Coding Flow as user-facing functional workflow next action can recommend Real Apply/Validation Hardening or Workflow Result Persistence" />
      <ConsolidationOverview summary={initialData} />
    </div>
  );
}
