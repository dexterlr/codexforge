"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstCommandExecutionTrialReviewModel } from "@/lib/codexforge/first-command-execution-trial-review";

export function FirstCommandExecutionTrialReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstCommandExecutionTrialReviewModel()} />;
}
