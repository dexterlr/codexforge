"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildSharedBrainModelRouterCandidateModel } from "@/lib/codexforge/shared-brain-model-router-candidate";

export function SharedBrainModelRouterCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildSharedBrainModelRouterCandidateModel()} />;
}
