"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelPrivacyRiskScorePreviewModel } from "@/lib/codexforge/model-privacy-risk-score-preview";

export function ModelPrivacyRiskScorePreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelPrivacyRiskScorePreviewModel()} />;
}
