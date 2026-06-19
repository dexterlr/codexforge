"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFreeModelProviderPreviewModel } from "@/lib/codexforge/free-model-provider-preview";

export function FreeModelProviderPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFreeModelProviderPreviewModel()} />;
}
