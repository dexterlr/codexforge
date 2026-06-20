"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstUsefulProjectBuilderCandidateModel } from "@/lib/codexforge/first-useful-project-builder-candidate";

export function FirstUsefulProjectBuilderCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstUsefulProjectBuilderCandidateModel()} />;
}
