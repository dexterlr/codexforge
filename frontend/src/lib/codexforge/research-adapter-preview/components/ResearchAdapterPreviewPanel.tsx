"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildResearchAdapterPreviewModel } from "@/lib/codexforge/research-adapter-preview";

export function ResearchAdapterPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildResearchAdapterPreviewModel()} />;
}
