"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstLocalRuntimeControlledTrialModel } from "@/lib/codexforge/first-local-runtime-controlled-trial";

export function FirstLocalRuntimeControlledTrialPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstLocalRuntimeControlledTrialModel()} />;
}
