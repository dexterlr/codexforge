"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildCrossModelFailureRecoveryPreviewModel } from "@/lib/codexforge/cross-model-failure-recovery-preview";

export function CrossModelFailureRecoveryPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildCrossModelFailureRecoveryPreviewModel()} />;
}
