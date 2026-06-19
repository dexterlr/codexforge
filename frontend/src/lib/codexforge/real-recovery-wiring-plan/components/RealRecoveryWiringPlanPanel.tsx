"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildRealRecoveryWiringPlanModel } from "@/lib/codexforge/real-recovery-wiring-plan";

export function RealRecoveryWiringPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildRealRecoveryWiringPlanModel()} />;
}
