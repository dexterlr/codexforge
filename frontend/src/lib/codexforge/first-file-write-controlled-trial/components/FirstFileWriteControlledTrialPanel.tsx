"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstFileWriteControlledTrialModel } from "@/lib/codexforge/first-file-write-controlled-trial";

export function FirstFileWriteControlledTrialPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstFileWriteControlledTrialModel()} />;
}
