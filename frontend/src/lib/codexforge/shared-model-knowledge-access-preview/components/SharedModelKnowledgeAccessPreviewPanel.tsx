"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildSharedModelKnowledgeAccessPreviewModel } from "@/lib/codexforge/shared-model-knowledge-access-preview";

export function SharedModelKnowledgeAccessPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildSharedModelKnowledgeAccessPreviewModel()} />;
}
