"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildRealAdapterValidationWiringPlanModel } from "@/lib/codexforge/real-adapter-validation-wiring-plan";

export function RealAdapterValidationWiringPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildRealAdapterValidationWiringPlanModel()} />;
}
