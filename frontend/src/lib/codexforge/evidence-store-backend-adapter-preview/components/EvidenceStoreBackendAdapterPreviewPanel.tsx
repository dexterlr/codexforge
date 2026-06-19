"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildEvidenceStoreBackendAdapterPreviewModel } from "@/lib/codexforge/evidence-store-backend-adapter-preview";

export function EvidenceStoreBackendAdapterPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildEvidenceStoreBackendAdapterPreviewModel()} />;
}
