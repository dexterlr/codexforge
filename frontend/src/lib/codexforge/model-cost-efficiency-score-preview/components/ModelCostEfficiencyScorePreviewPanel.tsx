"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelCostEfficiencyScorePreviewModel } from "@/lib/codexforge/model-cost-efficiency-score-preview";

export function ModelCostEfficiencyScorePreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelCostEfficiencyScorePreviewModel()} />;
}
