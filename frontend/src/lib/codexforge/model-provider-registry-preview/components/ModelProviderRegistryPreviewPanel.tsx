"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelProviderRegistryPreviewModel } from "@/lib/codexforge/model-provider-registry-preview";

export function ModelProviderRegistryPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelProviderRegistryPreviewModel()} />;
}
