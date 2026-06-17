"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFileWriteControlledTrialPlanModel } from "@/lib/codexforge/file-write-controlled-trial-plan";

export function FileWriteControlledTrialPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFileWriteControlledTrialPlanModel()} />;
}
