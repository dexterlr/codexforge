"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildRealResultStoreWiringPlanModel } from "@/lib/codexforge/real-result-store-wiring-plan";

export function RealResultStoreWiringPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildRealResultStoreWiringPlanModel()} />;
}
