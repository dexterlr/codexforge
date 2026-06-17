"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProviderModelControlledTrialPlanModel } from "@/lib/codexforge/provider-model-controlled-trial-plan";

export function ProviderModelControlledTrialPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProviderModelControlledTrialPlanModel()} />;
}
