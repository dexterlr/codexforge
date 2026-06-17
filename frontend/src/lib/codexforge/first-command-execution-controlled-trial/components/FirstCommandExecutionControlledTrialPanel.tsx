"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstCommandExecutionControlledTrialModel } from "@/lib/codexforge/first-command-execution-controlled-trial";

export function FirstCommandExecutionControlledTrialPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstCommandExecutionControlledTrialModel()} />;
}
