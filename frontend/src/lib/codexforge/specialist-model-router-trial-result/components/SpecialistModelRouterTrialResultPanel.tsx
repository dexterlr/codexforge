"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildSpecialistModelRouterTrialResultModel } from "@/lib/codexforge/specialist-model-router-trial-result";

export function SpecialistModelRouterTrialResultPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildSpecialistModelRouterTrialResultModel()} />;
}
