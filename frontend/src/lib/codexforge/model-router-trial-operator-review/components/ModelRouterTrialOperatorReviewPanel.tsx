"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelRouterTrialOperatorReviewModel } from "@/lib/codexforge/model-router-trial-operator-review";

export function ModelRouterTrialOperatorReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelRouterTrialOperatorReviewModel()} />;
}
