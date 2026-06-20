"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelRouterSharedContextReviewModel } from "@/lib/codexforge/model-router-shared-context-review";

export function ModelRouterSharedContextReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelRouterSharedContextReviewModel()} />;
}
