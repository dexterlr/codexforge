"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildCreativeAdapterContractReviewModel } from "@/lib/codexforge/creative-adapter-contract-review";

export function CreativeAdapterContractReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildCreativeAdapterContractReviewModel()} />;
}
