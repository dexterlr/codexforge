"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildCreativeAdapterPreviewModel } from "@/lib/codexforge/creative-adapter-preview";

export function CreativeAdapterPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildCreativeAdapterPreviewModel()} />;
}
