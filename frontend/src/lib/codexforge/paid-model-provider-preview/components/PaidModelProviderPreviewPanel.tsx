"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildPaidModelProviderPreviewModel } from "@/lib/codexforge/paid-model-provider-preview";

export function PaidModelProviderPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildPaidModelProviderPreviewModel()} />;
}
