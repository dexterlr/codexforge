"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelSelectionDryRunResultPreviewModel } from "@/lib/codexforge/model-selection-dry-run-result-preview";

export function ModelSelectionDryRunResultPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelSelectionDryRunResultPreviewModel()} />;
}
