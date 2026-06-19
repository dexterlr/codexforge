"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAdapterBackendValidationContractModel } from "@/lib/codexforge/adapter-backend-validation-contract";

export function AdapterBackendValidationContractPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAdapterBackendValidationContractModel()} />;
}
