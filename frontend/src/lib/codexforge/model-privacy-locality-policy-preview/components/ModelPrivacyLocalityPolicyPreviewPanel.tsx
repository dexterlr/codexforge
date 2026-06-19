"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelPrivacyLocalityPolicyPreviewModel } from "@/lib/codexforge/model-privacy-locality-policy-preview";

export function ModelPrivacyLocalityPolicyPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelPrivacyLocalityPolicyPreviewModel()} />;
}
