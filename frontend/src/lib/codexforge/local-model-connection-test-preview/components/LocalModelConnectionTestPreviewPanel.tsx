"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildLocalModelConnectionTestPreviewModel } from "@/lib/codexforge/local-model-connection-test-preview";

export function LocalModelConnectionTestPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildLocalModelConnectionTestPreviewModel()} />;
}
