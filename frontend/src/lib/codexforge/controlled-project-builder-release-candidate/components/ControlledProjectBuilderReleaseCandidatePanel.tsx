"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildControlledProjectBuilderReleaseCandidateModel } from "@/lib/codexforge/controlled-project-builder-release-candidate";

export function ControlledProjectBuilderReleaseCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildControlledProjectBuilderReleaseCandidateModel()} />;
}
