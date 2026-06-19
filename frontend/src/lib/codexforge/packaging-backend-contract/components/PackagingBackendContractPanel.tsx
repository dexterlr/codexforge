"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildPackagingBackendContractModel } from "@/lib/codexforge/packaging-backend-contract";

export function PackagingBackendContractPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildPackagingBackendContractModel()} />;
}
