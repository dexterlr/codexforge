"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildResultStoreBackendAdapterPreviewModel } from "@/lib/codexforge/result-store-backend-adapter-preview";

export function ResultStoreBackendAdapterPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildResultStoreBackendAdapterPreviewModel()} />;
}
