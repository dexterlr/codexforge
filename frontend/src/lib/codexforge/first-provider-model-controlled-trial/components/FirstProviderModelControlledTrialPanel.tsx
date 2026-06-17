"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstProviderModelControlledTrialModel } from "@/lib/codexforge/first-provider-model-controlled-trial";

export function FirstProviderModelControlledTrialPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstProviderModelControlledTrialModel()} />;
}
