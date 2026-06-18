"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildResultStoreAdapterPreviewModel } from "@/lib/codexforge/result-store-adapter-preview";

export function ResultStoreAdapterPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildResultStoreAdapterPreviewModel()} />;
}
