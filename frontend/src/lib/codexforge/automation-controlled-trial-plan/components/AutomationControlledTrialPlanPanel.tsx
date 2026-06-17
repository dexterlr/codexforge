"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAutomationControlledTrialPlanModel } from "@/lib/codexforge/automation-controlled-trial-plan";

export function AutomationControlledTrialPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAutomationControlledTrialPlanModel()} />;
}
