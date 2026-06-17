"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstProjectScaffoldControlledTrialModel } from "@/lib/codexforge/first-project-scaffold-controlled-trial";

export function FirstProjectScaffoldControlledTrialPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstProjectScaffoldControlledTrialModel()} />;
}
