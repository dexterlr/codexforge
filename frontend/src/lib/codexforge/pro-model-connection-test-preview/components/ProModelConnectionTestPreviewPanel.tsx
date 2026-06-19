"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProModelConnectionTestPreviewModel } from "@/lib/codexforge/pro-model-connection-test-preview";

export function ProModelConnectionTestPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProModelConnectionTestPreviewModel()} />;
}
