"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildUniversalBuilderControlledTrialCandidateModel } from "@/lib/codexforge/universal-builder-controlled-trial-candidate";

export function UniversalBuilderControlledTrialCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalBuilderControlledTrialCandidateModel()} />;
}
