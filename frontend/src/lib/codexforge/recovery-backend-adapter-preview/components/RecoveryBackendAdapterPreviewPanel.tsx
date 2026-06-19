"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildRecoveryBackendAdapterPreviewModel } from "@/lib/codexforge/recovery-backend-adapter-preview";

export function RecoveryBackendAdapterPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildRecoveryBackendAdapterPreviewModel()} />;
}
