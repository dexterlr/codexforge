"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstBackendAdapterImplementationPreviewCandidateModel } from "@/lib/codexforge/first-backend-adapter-implementation-preview-candidate";

export function FirstBackendAdapterImplementationPreviewCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstBackendAdapterImplementationPreviewCandidateModel()} />;
}
