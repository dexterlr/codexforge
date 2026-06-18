"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstRealAdapterMvpCandidateModel } from "@/lib/codexforge/first-real-adapter-mvp-candidate";

export function FirstRealAdapterMvpCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstRealAdapterMvpCandidateModel()} />;
}
