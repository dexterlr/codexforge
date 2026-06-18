"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildPackagingAdapterPreviewModel } from "@/lib/codexforge/packaging-adapter-preview";

export function PackagingAdapterPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildPackagingAdapterPreviewModel()} />;
}
