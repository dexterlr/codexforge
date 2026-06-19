"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelRouterSelectionPreviewModel } from "@/lib/codexforge/model-router-selection-preview";

export function ModelRouterSelectionPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelRouterSelectionPreviewModel()} />;
}
