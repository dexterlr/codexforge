"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildResultStoreAdapterImplementationSliceModel } from "@/lib/codexforge/result-store-adapter-implementation-slice";

export function ResultStoreAdapterImplementationSlicePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildResultStoreAdapterImplementationSliceModel()} />;
}
