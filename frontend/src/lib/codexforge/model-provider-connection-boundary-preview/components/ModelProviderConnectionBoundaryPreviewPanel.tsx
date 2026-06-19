"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelProviderConnectionBoundaryPreviewModel } from "@/lib/codexforge/model-provider-connection-boundary-preview";

export function ModelProviderConnectionBoundaryPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelProviderConnectionBoundaryPreviewModel()} />;
}
