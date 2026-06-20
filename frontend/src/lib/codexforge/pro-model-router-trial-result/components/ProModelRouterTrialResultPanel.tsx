"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProModelRouterTrialResultModel } from "@/lib/codexforge/pro-model-router-trial-result";

export function ProModelRouterTrialResultPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProModelRouterTrialResultModel()} />;
}
