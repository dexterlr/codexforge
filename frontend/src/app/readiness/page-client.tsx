"use client";

import { ProductReadinessAudit } from "@/lib/codexforge/product-readiness-audit/components";
import type { ProductReadinessSummary } from "@/lib/codexforge/product-readiness-audit";

type ReadinessPageClientProps = {
  initialData: ProductReadinessSummary;
};

export default function ReadinessPageClient({ initialData }: ReadinessPageClientProps) {
  return <ProductReadinessAudit summary={initialData} />;
}
