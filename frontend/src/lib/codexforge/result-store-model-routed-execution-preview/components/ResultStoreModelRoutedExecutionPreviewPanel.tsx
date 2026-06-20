"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildResultStoreModelRoutedExecutionPreviewModel } from "@/lib/codexforge/result-store-model-routed-execution-preview";

export function ResultStoreModelRoutedExecutionPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildResultStoreModelRoutedExecutionPreviewModel()} />;
}
