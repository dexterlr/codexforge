"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildBackendAdapterBoundaryContractModel } from "@/lib/codexforge/backend-adapter-boundary-contract";

export function BackendAdapterBoundaryContractPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBackendAdapterBoundaryContractModel()} />;
}
