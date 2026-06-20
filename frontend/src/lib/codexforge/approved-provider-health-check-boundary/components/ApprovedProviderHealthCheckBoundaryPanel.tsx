"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildApprovedProviderHealthCheckBoundaryModel } from "@/lib/codexforge/approved-provider-health-check-boundary";

export function ApprovedProviderHealthCheckBoundaryPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildApprovedProviderHealthCheckBoundaryModel()} />;
}
