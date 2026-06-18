"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstLocalRuntimeAdapterImplementationReviewModel } from "@/lib/codexforge/first-local-runtime-adapter-implementation-review";

export function FirstLocalRuntimeAdapterImplementationReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstLocalRuntimeAdapterImplementationReviewModel()} />;
}
