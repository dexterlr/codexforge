"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildLocalRuntimeAdapterContractReviewModel } from "@/lib/codexforge/local-runtime-adapter-contract-review";

export function LocalRuntimeAdapterContractReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildLocalRuntimeAdapterContractReviewModel()} />;
}
