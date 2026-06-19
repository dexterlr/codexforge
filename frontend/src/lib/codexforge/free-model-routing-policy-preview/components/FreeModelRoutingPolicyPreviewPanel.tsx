"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFreeModelRoutingPolicyPreviewModel } from "@/lib/codexforge/free-model-routing-policy-preview";

export function FreeModelRoutingPolicyPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFreeModelRoutingPolicyPreviewModel()} />;
}
