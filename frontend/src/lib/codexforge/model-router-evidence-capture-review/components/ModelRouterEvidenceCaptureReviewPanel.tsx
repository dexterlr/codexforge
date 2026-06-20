"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelRouterEvidenceCaptureReviewModel } from "@/lib/codexforge/model-router-evidence-capture-review";

export function ModelRouterEvidenceCaptureReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelRouterEvidenceCaptureReviewModel()} />;
}
