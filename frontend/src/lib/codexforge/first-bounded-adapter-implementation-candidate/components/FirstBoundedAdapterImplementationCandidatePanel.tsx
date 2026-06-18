"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstBoundedAdapterImplementationCandidateModel } from "@/lib/codexforge/first-bounded-adapter-implementation-candidate";

export function FirstBoundedAdapterImplementationCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstBoundedAdapterImplementationCandidateModel()} />;
}
