"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelToolSupportScorePreviewModel } from "@/lib/codexforge/model-tool-support-score-preview";

export function ModelToolSupportScorePreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelToolSupportScorePreviewModel()} />;
}
