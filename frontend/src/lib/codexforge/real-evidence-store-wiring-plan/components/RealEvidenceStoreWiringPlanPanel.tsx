"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildRealEvidenceStoreWiringPlanModel } from "@/lib/codexforge/real-evidence-store-wiring-plan";

export function RealEvidenceStoreWiringPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildRealEvidenceStoreWiringPlanModel()} />;
}
