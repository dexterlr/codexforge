"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildResultStoreBackendContractModel } from "@/lib/codexforge/result-store-backend-contract";

export function ResultStoreBackendContractPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildResultStoreBackendContractModel()} />;
}
