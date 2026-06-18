"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildEvidenceStoreAdapterPreviewModel } from "@/lib/codexforge/evidence-store-adapter-preview";

export function EvidenceStoreAdapterPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildEvidenceStoreAdapterPreviewModel()} />;
}
