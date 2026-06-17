"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFileWriteControlledTrialReviewModel } from "@/lib/codexforge/file-write-controlled-trial-review";

export function FileWriteControlledTrialReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFileWriteControlledTrialReviewModel()} />;
}
