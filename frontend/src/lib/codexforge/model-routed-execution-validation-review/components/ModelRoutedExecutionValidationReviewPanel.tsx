"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelRoutedExecutionValidationReviewModel } from "@/lib/codexforge/model-routed-execution-validation-review";

export function ModelRoutedExecutionValidationReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelRoutedExecutionValidationReviewModel()} />;
}
