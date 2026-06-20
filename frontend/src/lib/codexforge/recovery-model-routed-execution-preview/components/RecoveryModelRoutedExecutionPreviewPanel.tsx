"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildRecoveryModelRoutedExecutionPreviewModel } from "@/lib/codexforge/recovery-model-routed-execution-preview";

export function RecoveryModelRoutedExecutionPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildRecoveryModelRoutedExecutionPreviewModel()} />;
}
