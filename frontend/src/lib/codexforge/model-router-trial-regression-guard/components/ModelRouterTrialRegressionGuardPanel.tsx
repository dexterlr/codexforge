"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelRouterTrialRegressionGuardModel } from "@/lib/codexforge/model-router-trial-regression-guard";

export function ModelRouterTrialRegressionGuardPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelRouterTrialRegressionGuardModel()} />;
}
