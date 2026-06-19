"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelCredentialBoundaryPreviewModel } from "@/lib/codexforge/model-credential-boundary-preview";

export function ModelCredentialBoundaryPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelCredentialBoundaryPreviewModel()} />;
}
