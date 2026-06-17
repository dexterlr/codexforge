"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildCommandExecutionControlledTrialPlanModel } from "@/lib/codexforge/command-execution-controlled-trial-plan";

export function CommandExecutionControlledTrialPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildCommandExecutionControlledTrialPlanModel()} />;
}
