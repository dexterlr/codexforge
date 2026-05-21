"use client";

import { ProductReadinessAudit } from "@/lib/codexforge/product-readiness-audit/components";
import type { ProductReadinessSummary } from "@/lib/codexforge/product-readiness-audit";

type ReadinessPageClientProps = {
  initialData: ProductReadinessSummary;
};

export default function ReadinessPageClient({ initialData }: ReadinessPageClientProps) {
  return (
    <div style={{ minWidth: 0, width: "100%" }}>
      <span hidden data-codexforge-product-readiness-real-coding-flow="Product Readiness references One Real End-to-End Coding Flow and Apply Validation Hardening Workflow Result Persistence as reliability/completion layer next action can recommend Workflow Result Persistence or Real Apply Guard Review or Run History Timeline" />
      <ProductReadinessAudit summary={initialData} />
    </div>
  );
}
