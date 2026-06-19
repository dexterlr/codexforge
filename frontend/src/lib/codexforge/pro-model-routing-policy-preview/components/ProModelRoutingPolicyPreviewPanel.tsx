"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProModelRoutingPolicyPreviewModel } from "@/lib/codexforge/pro-model-routing-policy-preview";

export function ProModelRoutingPolicyPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProModelRoutingPolicyPreviewModel()} />;
}
