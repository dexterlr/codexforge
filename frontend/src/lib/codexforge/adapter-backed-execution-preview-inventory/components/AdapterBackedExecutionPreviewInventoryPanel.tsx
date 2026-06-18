"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAdapterBackedExecutionPreviewInventoryModel } from "@/lib/codexforge/adapter-backed-execution-preview-inventory";

export function AdapterBackedExecutionPreviewInventoryPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAdapterBackedExecutionPreviewInventoryModel()} />;
}
