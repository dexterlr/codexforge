"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildRealAdapterOperatorTrialPlanModel } from "@/lib/codexforge/real-adapter-operator-trial-plan";

export function RealAdapterOperatorTrialPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildRealAdapterOperatorTrialPlanModel()} />;
}
