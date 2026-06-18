"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildLocalRuntimeAdapterPreviewModel } from "@/lib/codexforge/local-runtime-adapter-preview";

export function LocalRuntimeAdapterPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildLocalRuntimeAdapterPreviewModel()} />;
}
