"use client";

import { ConsolidationOverview } from "@/lib/codexforge/consolidation/components";
import type { ConsolidationSummary } from "@/lib/codexforge/consolidation";

type ConsolidationPageClientProps = {
  initialData: ConsolidationSummary;
};

export default function ConsolidationPageClient({ initialData }: ConsolidationPageClientProps) {
  return (
    <div style={{ minWidth: 0, width: "100%" }}>
      <span hidden data-codexforge-consolidation-real-coding-flow="Consolidation references Coding Flow Live Trial Pack as operator trial/readiness layer One Real End-to-End Coding Flow and Apply Validation Hardening Workflow Result Persistence and Run History Timeline as user-facing completion/history layer next action can recommend Coding Flow Live Trial Run or Real Apply Guard Review or Workflow Result Persistence or Run History Timeline" />
      <ConsolidationOverview summary={initialData} />
    </div>
  );
}
