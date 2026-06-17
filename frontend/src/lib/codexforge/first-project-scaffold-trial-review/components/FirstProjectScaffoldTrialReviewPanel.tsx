"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstProjectScaffoldTrialReviewModel } from "@/lib/codexforge/first-project-scaffold-trial-review";

export function FirstProjectScaffoldTrialReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstProjectScaffoldTrialReviewModel()} />;
}
