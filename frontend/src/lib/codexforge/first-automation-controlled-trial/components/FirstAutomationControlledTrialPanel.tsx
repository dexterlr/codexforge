"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstAutomationControlledTrialModel } from "@/lib/codexforge/first-automation-controlled-trial";

export function FirstAutomationControlledTrialPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstAutomationControlledTrialModel()} />;
}
