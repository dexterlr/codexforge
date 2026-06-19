"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelCapabilityRegistryPreviewModel } from "@/lib/codexforge/model-capability-registry-preview";

export function ModelCapabilityRegistryPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelCapabilityRegistryPreviewModel()} />;
}
