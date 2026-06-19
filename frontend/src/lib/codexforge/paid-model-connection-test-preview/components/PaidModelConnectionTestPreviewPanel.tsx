"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildPaidModelConnectionTestPreviewModel } from "@/lib/codexforge/paid-model-connection-test-preview";

export function PaidModelConnectionTestPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildPaidModelConnectionTestPreviewModel()} />;
}
