"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstControlledProviderTrialCandidateModel } from "@/lib/codexforge/first-controlled-provider-trial-candidate";

export function FirstControlledProviderTrialCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstControlledProviderTrialCandidateModel()} />;
}
