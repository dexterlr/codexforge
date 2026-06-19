"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildCrossModelResultComparisonPreviewModel } from "@/lib/codexforge/cross-model-result-comparison-preview";

export function CrossModelResultComparisonPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildCrossModelResultComparisonPreviewModel()} />;
}
