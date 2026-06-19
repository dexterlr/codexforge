"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelQualityScorePreviewModel } from "@/lib/codexforge/model-quality-score-preview";

export function ModelQualityScorePreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelQualityScorePreviewModel()} />;
}
