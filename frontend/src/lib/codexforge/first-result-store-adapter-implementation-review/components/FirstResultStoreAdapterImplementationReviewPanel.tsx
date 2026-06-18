"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstResultStoreAdapterImplementationReviewModel } from "@/lib/codexforge/first-result-store-adapter-implementation-review";

export function FirstResultStoreAdapterImplementationReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstResultStoreAdapterImplementationReviewModel()} />;
}
