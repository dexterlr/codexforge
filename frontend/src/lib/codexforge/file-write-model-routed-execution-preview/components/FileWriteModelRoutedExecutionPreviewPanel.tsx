"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFileWriteModelRoutedExecutionPreviewModel } from "@/lib/codexforge/file-write-model-routed-execution-preview";

export function FileWriteModelRoutedExecutionPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFileWriteModelRoutedExecutionPreviewModel()} />;
}
