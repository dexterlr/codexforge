"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstPackagingAdapterImplementationReviewModel } from "@/lib/codexforge/first-packaging-adapter-implementation-review";

export function FirstPackagingAdapterImplementationReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstPackagingAdapterImplementationReviewModel()} />;
}
