"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildPackagingExportControlledTrialPlanModel } from "@/lib/codexforge/packaging-export-controlled-trial-plan";

export function PackagingExportControlledTrialPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildPackagingExportControlledTrialPlanModel()} />;
}
