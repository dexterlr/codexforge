import { buildConsolidationSummary } from "@/lib/codexforge/consolidation";
import ConsolidationPageClient from "./page-client";

export default function ConsolidationPage() {
  return <ConsolidationPageClient initialData={buildConsolidationSummary()} />;
}
