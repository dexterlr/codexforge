"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildLocalModelRoutingPolicyPreviewModel } from "@/lib/codexforge/local-model-routing-policy-preview";

export function LocalModelRoutingPolicyPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildLocalModelRoutingPolicyPreviewModel()} />;
}
