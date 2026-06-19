"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelRouterDecisionExplanationReviewModel } from "@/lib/codexforge/model-router-decision-explanation-review";

export function ModelRouterDecisionExplanationReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelRouterDecisionExplanationReviewModel()} />;
}

