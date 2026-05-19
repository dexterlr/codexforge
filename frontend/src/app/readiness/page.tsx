import { buildProductReadinessSummary } from "@/lib/codexforge/product-readiness-audit";
import ReadinessPageClient from "./page-client";

export default function ReadinessPage() {
  return <ReadinessPageClient initialData={buildProductReadinessSummary()} />;
}
