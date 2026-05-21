"use client";

import { ConsolidationOverview } from "@/lib/codexforge/consolidation/components";
import type { ConsolidationSummary } from "@/lib/codexforge/consolidation";

type ConsolidationPageClientProps = {
  initialData: ConsolidationSummary;
};

export default function ConsolidationPageClient({ initialData }: ConsolidationPageClientProps) {
  return (
    <div style={{ minWidth: 0, width: "100%" }}>
      <span hidden data-codexforge-consolidation-real-coding-flow="Consolidation references One Real End-to-End Coding Flow and Apply Validation Hardening as reliability layer next action can recommend Workflow Result Persistence or Real Apply Guard Review" />
      <ConsolidationOverview summary={initialData} />
    </div>
  );
}
