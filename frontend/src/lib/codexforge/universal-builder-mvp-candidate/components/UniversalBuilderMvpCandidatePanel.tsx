"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildUniversalBuilderMvpCandidateModel } from "@/lib/codexforge/universal-builder-mvp-candidate";

export function UniversalBuilderMvpCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalBuilderMvpCandidateModel()} />;
}
