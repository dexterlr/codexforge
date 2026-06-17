"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildLocalRuntimeControlledTrialReviewModel } from "@/lib/codexforge/local-runtime-controlled-trial-review";

export function LocalRuntimeControlledTrialReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildLocalRuntimeControlledTrialReviewModel()} />;
}
