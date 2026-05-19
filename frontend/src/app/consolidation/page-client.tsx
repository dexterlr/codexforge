"use client";

import { ConsolidationOverview } from "@/lib/codexforge/consolidation/components";
import type { ConsolidationSummary } from "@/lib/codexforge/consolidation";

type ConsolidationPageClientProps = {
  initialData: ConsolidationSummary;
};

export default function ConsolidationPageClient({ initialData }: ConsolidationPageClientProps) {
  return (
    <div style={{ minWidth: 0, width: "100%" }}>
      <ConsolidationOverview summary={initialData} />
    </div>
  );
}
