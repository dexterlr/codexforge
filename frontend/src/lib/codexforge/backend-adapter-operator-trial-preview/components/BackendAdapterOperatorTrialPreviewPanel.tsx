"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildBackendAdapterOperatorTrialPreviewModel } from "@/lib/codexforge/backend-adapter-operator-trial-preview";

export function BackendAdapterOperatorTrialPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBackendAdapterOperatorTrialPreviewModel()} />;
}
