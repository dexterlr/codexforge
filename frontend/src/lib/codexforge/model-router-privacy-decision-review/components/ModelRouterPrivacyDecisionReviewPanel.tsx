"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelRouterPrivacyDecisionReviewModel } from "@/lib/codexforge/model-router-privacy-decision-review";

export function ModelRouterPrivacyDecisionReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelRouterPrivacyDecisionReviewModel()} />;
}
