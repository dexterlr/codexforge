"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelLatencyScorePreviewModel } from "@/lib/codexforge/model-latency-score-preview";

export function ModelLatencyScorePreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelLatencyScorePreviewModel()} />;
}
