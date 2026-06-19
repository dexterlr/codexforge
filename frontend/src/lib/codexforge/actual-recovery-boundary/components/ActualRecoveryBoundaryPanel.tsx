"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildActualRecoveryBoundaryModel } from "@/lib/codexforge/actual-recovery-boundary";

export function ActualRecoveryBoundaryPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildActualRecoveryBoundaryModel()} />;
}
