"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAdapterImplementationApprovalGateModel } from "@/lib/codexforge/adapter-implementation-approval-gate";

export function AdapterImplementationApprovalGatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAdapterImplementationApprovalGateModel()} />;
}
