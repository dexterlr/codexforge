"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstControlledModelRouterTrialReviewModel } from "@/lib/codexforge/first-controlled-model-router-trial-review";

export function FirstControlledModelRouterTrialReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstControlledModelRouterTrialReviewModel()} />;
}

