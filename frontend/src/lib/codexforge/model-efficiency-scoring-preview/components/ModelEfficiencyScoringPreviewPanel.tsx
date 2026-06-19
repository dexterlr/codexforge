"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelEfficiencyScoringPreviewModel } from "@/lib/codexforge/model-efficiency-scoring-preview";

export function ModelEfficiencyScoringPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelEfficiencyScoringPreviewModel()} />;
}
