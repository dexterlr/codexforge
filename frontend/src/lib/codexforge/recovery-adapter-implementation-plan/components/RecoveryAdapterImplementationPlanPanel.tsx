"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildRecoveryAdapterImplementationPlanModel } from "@/lib/codexforge/recovery-adapter-implementation-plan";

export function RecoveryAdapterImplementationPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildRecoveryAdapterImplementationPlanModel()} />;
}
