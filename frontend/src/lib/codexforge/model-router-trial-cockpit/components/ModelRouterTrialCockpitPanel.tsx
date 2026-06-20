"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelRouterTrialCockpitModel } from "@/lib/codexforge/model-router-trial-cockpit";

export function ModelRouterTrialCockpitPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelRouterTrialCockpitModel()} />;
}
