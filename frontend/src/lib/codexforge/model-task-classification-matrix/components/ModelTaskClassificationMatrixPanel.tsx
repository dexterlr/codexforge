"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelTaskClassificationMatrixModel } from "@/lib/codexforge/model-task-classification-matrix";

export function ModelTaskClassificationMatrixPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelTaskClassificationMatrixModel()} />;
}
