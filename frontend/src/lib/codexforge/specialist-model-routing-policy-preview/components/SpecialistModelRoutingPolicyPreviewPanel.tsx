"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildSpecialistModelRoutingPolicyPreviewModel } from "@/lib/codexforge/specialist-model-routing-policy-preview";

export function SpecialistModelRoutingPolicyPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildSpecialistModelRoutingPolicyPreviewModel()} />;
}
