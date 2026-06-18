"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstUsefulControlledAdapterMvpCandidateModel } from "@/lib/codexforge/first-useful-controlled-adapter-mvp-candidate";

export function FirstUsefulControlledAdapterMvpCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstUsefulControlledAdapterMvpCandidateModel()} />;
}
