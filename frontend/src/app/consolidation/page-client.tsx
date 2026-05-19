"use client";

import { ConsolidationOverview } from "@/lib/codexforge/consolidation/components";
import type { ConsolidationSummary } from "@/lib/codexforge/consolidation";

type ConsolidationPageClientProps = {
  initialData: ConsolidationSummary;
};

export default function ConsolidationPageClient({ initialData }: ConsolidationPageClientProps) {
  return <ConsolidationOverview summary={initialData} />;
}
