"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildPaidModelRoutingPolicyPreviewModel } from "@/lib/codexforge/paid-model-routing-policy-preview";

export function PaidModelRoutingPolicyPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildPaidModelRoutingPolicyPreviewModel()} />;
}
