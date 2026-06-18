"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstEvidenceStoreAdapterImplementationReviewModel } from "@/lib/codexforge/first-evidence-store-adapter-implementation-review";

export function FirstEvidenceStoreAdapterImplementationReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstEvidenceStoreAdapterImplementationReviewModel()} />;
}
