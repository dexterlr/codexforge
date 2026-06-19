"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildSharedModelMemoryAccessPreviewModel } from "@/lib/codexforge/shared-model-memory-access-preview";

export function SharedModelMemoryAccessPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildSharedModelMemoryAccessPreviewModel()} />;
}
