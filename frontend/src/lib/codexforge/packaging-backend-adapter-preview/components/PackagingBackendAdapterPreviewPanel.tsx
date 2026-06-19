"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildPackagingBackendAdapterPreviewModel } from "@/lib/codexforge/packaging-backend-adapter-preview";

export function PackagingBackendAdapterPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildPackagingBackendAdapterPreviewModel()} />;
}
