"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildRealPackagingWiringPlanModel } from "@/lib/codexforge/real-packaging-wiring-plan";

export function RealPackagingWiringPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildRealPackagingWiringPlanModel()} />;
}
