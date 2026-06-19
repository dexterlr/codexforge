"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelFallbackChainPreviewModel } from "@/lib/codexforge/model-fallback-chain-preview";

export function ModelFallbackChainPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelFallbackChainPreviewModel()} />;
}
