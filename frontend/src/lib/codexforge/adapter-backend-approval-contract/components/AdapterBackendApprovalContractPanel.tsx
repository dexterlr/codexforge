"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAdapterBackendApprovalContractModel } from "@/lib/codexforge/adapter-backend-approval-contract";

export function AdapterBackendApprovalContractPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAdapterBackendApprovalContractModel()} />;
}
