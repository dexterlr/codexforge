"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstAdapterExecutionBetaReviewModel } from "@/lib/codexforge/first-adapter-execution-beta-review";

export function FirstAdapterExecutionBetaReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstAdapterExecutionBetaReviewModel()} />;
}
