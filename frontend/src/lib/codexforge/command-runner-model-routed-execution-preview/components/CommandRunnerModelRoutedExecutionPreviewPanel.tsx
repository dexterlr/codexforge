"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildCommandRunnerModelRoutedExecutionPreviewModel } from "@/lib/codexforge/command-runner-model-routed-execution-preview";

export function CommandRunnerModelRoutedExecutionPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildCommandRunnerModelRoutedExecutionPreviewModel()} />;
}
