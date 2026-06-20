"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelRouterBudgetDecisionReviewModel } from "@/lib/codexforge/model-router-budget-decision-review";

export function ModelRouterBudgetDecisionReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelRouterBudgetDecisionReviewModel()} />;
}
