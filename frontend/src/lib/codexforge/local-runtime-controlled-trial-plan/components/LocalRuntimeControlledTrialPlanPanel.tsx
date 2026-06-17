"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildLocalRuntimeControlledTrialPlanModel } from "@/lib/codexforge/local-runtime-controlled-trial-plan";

export function LocalRuntimeControlledTrialPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildLocalRuntimeControlledTrialPlanModel()} />;
}
