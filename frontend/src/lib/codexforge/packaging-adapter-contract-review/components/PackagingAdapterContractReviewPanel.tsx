"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildPackagingAdapterContractReviewModel } from "@/lib/codexforge/packaging-adapter-contract-review";

export function PackagingAdapterContractReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildPackagingAdapterContractReviewModel()} />;
}
