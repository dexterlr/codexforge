"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildLocalRuntimeModelRoutedExecutionPreviewModel } from "@/lib/codexforge/local-runtime-model-routed-execution-preview";

export function LocalRuntimeModelRoutedExecutionPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildLocalRuntimeModelRoutedExecutionPreviewModel()} />;
}
