"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildResultStoreAdapterContractReviewModel } from "@/lib/codexforge/result-store-adapter-contract-review";

export function ResultStoreAdapterContractReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildResultStoreAdapterContractReviewModel()} />;
}
