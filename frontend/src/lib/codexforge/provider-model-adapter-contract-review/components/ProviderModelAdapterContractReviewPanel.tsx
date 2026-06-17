"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProviderModelAdapterContractReviewModel } from "@/lib/codexforge/provider-model-adapter-contract-review";

export function ProviderModelAdapterContractReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProviderModelAdapterContractReviewModel()} />;
}
