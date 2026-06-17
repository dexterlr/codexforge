"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildCommandExecutionControlledTrialReviewModel } from "@/lib/codexforge/command-execution-controlled-trial-review";

export function CommandExecutionControlledTrialReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildCommandExecutionControlledTrialReviewModel()} />;
}
