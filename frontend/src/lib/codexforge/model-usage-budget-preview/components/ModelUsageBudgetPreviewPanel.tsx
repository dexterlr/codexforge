"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelUsageBudgetPreviewModel } from "@/lib/codexforge/model-usage-budget-preview";

export function ModelUsageBudgetPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelUsageBudgetPreviewModel()} />;
}
