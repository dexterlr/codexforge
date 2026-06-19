"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFreeModelConnectionTestPreviewModel } from "@/lib/codexforge/free-model-connection-test-preview";

export function FreeModelConnectionTestPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFreeModelConnectionTestPreviewModel()} />;
}
