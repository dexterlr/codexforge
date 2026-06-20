"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildPaidModelRouterTrialResultModel } from "@/lib/codexforge/paid-model-router-trial-result";

export function PaidModelRouterTrialResultPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildPaidModelRouterTrialResultModel()} />;
}
