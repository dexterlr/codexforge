"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildControlledModelUseReleaseCandidateModel } from "@/lib/codexforge/controlled-model-use-release-candidate";

export function ControlledModelUseReleaseCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildControlledModelUseReleaseCandidateModel()} />;
}

