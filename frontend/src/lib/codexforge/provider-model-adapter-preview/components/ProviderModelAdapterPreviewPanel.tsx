"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProviderModelAdapterPreviewModel } from "@/lib/codexforge/provider-model-adapter-preview";

export function ProviderModelAdapterPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProviderModelAdapterPreviewModel()} />;
}
