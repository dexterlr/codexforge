"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstFileWriteTrialReviewModel } from "@/lib/codexforge/first-file-write-trial-review";

export function FirstFileWriteTrialReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstFileWriteTrialReviewModel()} />;
}
