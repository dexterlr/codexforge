"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstBoundedAdapterImplementationLayerCandidateModel } from "@/lib/codexforge/first-bounded-adapter-implementation-layer-candidate";

export function FirstBoundedAdapterImplementationLayerCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstBoundedAdapterImplementationLayerCandidateModel()} />;
}
