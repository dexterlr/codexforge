"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildLocalModelProviderPreviewModel } from "@/lib/codexforge/local-model-provider-preview";

export function LocalModelProviderPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildLocalModelProviderPreviewModel()} />;
}
