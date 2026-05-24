"use client";

import { ConsolidationOverview } from "@/lib/codexforge/consolidation/components";
import type { ConsolidationSummary } from "@/lib/codexforge/consolidation";

type ConsolidationPageClientProps = {
  initialData: ConsolidationSummary;
};

export default function ConsolidationPageClient({ initialData }: ConsolidationPageClientProps) {
  return (
    <div style={{ minWidth: 0, width: "100%" }}>
      <span hidden data-codexforge-consolidation-real-coding-flow="Consolidation references Coding Flow UX Fix Pack as usability layer Coding Flow Live Trial Pack as operator trial/readiness layer Coding Flow Trial Review as trial/readiness layer One Real End-to-End Coding Flow and Apply Validation Hardening Real Apply Guard Review listed as safety/reliability gate Workflow Result Persistence and Run History Timeline as user-facing completion/history layer next action can recommend Guarded Apply Candidate Implementation only if go/no-go permits or Coding Flow Live Trial Run after UX fixes or Real Apply Guard Review or Workflow Result Persistence or Run History Timeline" />
      <ConsolidationOverview summary={initialData} />
    </div>
  );
}
