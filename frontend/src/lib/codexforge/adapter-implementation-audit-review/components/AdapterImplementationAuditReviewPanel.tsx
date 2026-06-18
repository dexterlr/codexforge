"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAdapterImplementationAuditReviewModel } from "@/lib/codexforge/adapter-implementation-audit-review";

export function AdapterImplementationAuditReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAdapterImplementationAuditReviewModel()} />;
}
