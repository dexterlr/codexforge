"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProModelProviderPreviewModel } from "@/lib/codexforge/pro-model-provider-preview";

export function ProModelProviderPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProModelProviderPreviewModel()} />;
}
