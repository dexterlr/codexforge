"use client";

import { ProductReadinessAudit } from "@/lib/codexforge/product-readiness-audit/components";
import type { ProductReadinessSummary } from "@/lib/codexforge/product-readiness-audit";

type ReadinessPageClientProps = {
  initialData: ProductReadinessSummary;
};

export default function ReadinessPageClient({ initialData }: ReadinessPageClientProps) {
  return (
    <div style={{ minWidth: 0, width: "100%" }}>
      <span hidden data-codexforge-product-readiness-real-coding-flow="Product Readiness references Coding Flow Live Trial Pack as operator trial/readiness layer One Real End-to-End Coding Flow and Apply Validation Hardening Workflow Result Persistence and Run History Timeline as user-facing completion/history layer next action can recommend Coding Flow Live Trial Run or Real Apply Guard Review or Workflow Result Persistence or Run History Timeline" />
      <ProductReadinessAudit summary={initialData} />
    </div>
  );
}
