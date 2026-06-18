"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildResultStoreAdapterImplementationPlanModel } from "@/lib/codexforge/result-store-adapter-implementation-plan";

export function ResultStoreAdapterImplementationPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildResultStoreAdapterImplementationPlanModel()} />;
}
