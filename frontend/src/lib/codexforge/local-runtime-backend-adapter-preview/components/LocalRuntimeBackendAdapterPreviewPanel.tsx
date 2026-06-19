"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildLocalRuntimeBackendAdapterPreviewModel } from "@/lib/codexforge/local-runtime-backend-adapter-preview";

export function LocalRuntimeBackendAdapterPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildLocalRuntimeBackendAdapterPreviewModel()} />;
}
