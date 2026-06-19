"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildBackendAdapterValidationPreviewModel } from "@/lib/codexforge/backend-adapter-validation-preview";

export function BackendAdapterValidationPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBackendAdapterValidationPreviewModel()} />;
}
