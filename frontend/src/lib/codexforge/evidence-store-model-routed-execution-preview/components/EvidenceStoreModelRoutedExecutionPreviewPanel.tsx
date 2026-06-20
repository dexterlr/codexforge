"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildEvidenceStoreModelRoutedExecutionPreviewModel } from "@/lib/codexforge/evidence-store-model-routed-execution-preview";

export function EvidenceStoreModelRoutedExecutionPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildEvidenceStoreModelRoutedExecutionPreviewModel()} />;
}
