"use client";

import { ProductReadinessAudit } from "@/lib/codexforge/product-readiness-audit/components";
import type { ProductReadinessSummary } from "@/lib/codexforge/product-readiness-audit";

type ReadinessPageClientProps = {
  initialData: ProductReadinessSummary;
};

export default function ReadinessPageClient({ initialData }: ReadinessPageClientProps) {
  return (
    <div style={{ minWidth: 0, width: "100%" }}>
      <span hidden data-codexforge-product-readiness-real-coding-flow="Product Readiness references One Real End-to-End Coding Flow as user-facing functional workflow next action can recommend Real Apply/Validation Hardening or Workflow Result Persistence" />
      <ProductReadinessAudit summary={initialData} />
    </div>
  );
}
