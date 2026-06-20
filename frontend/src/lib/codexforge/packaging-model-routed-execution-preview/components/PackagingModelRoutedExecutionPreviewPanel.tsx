"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildPackagingModelRoutedExecutionPreviewModel } from "@/lib/codexforge/packaging-model-routed-execution-preview";

export function PackagingModelRoutedExecutionPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildPackagingModelRoutedExecutionPreviewModel()} />;
}
