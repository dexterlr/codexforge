"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelCostQualityPolicyPreviewModel } from "@/lib/codexforge/model-cost-quality-policy-preview";

export function ModelCostQualityPolicyPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelCostQualityPolicyPreviewModel()} />;
}
