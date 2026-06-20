"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelRoutedExecutionSandboxReviewModel } from "@/lib/codexforge/model-routed-execution-sandbox-review";

export function ModelRoutedExecutionSandboxReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelRoutedExecutionSandboxReviewModel()} />;
}
