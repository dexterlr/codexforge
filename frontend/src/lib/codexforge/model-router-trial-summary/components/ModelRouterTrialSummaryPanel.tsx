"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelRouterTrialSummaryModel } from "@/lib/codexforge/model-router-trial-summary";

export function ModelRouterTrialSummaryPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelRouterTrialSummaryModel()} />;
}
