"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildRecoveryAdapterPreviewModel } from "@/lib/codexforge/recovery-adapter-preview";

export function RecoveryAdapterPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildRecoveryAdapterPreviewModel()} />;
}
