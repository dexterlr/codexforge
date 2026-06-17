"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstPackagingExportControlledTrialModel } from "@/lib/codexforge/first-packaging-export-controlled-trial";

export function FirstPackagingExportControlledTrialPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstPackagingExportControlledTrialModel()} />;
}
