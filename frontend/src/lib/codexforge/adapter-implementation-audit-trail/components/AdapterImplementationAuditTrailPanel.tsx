"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAdapterImplementationAuditTrailModel } from "@/lib/codexforge/adapter-implementation-audit-trail";

export function AdapterImplementationAuditTrailPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAdapterImplementationAuditTrailModel()} />;
}
