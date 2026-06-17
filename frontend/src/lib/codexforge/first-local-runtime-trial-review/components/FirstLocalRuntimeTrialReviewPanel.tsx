"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstLocalRuntimeTrialReviewModel } from "@/lib/codexforge/first-local-runtime-trial-review";

export function FirstLocalRuntimeTrialReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstLocalRuntimeTrialReviewModel()} />;
}
