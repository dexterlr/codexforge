"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFreeModelRouterTrialResultModel } from "@/lib/codexforge/free-model-router-trial-result";

export function FreeModelRouterTrialResultPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFreeModelRouterTrialResultModel()} />;
}
