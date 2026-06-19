"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstRealAdapterWiringCandidateModel } from "@/lib/codexforge/first-real-adapter-wiring-candidate";

export function FirstRealAdapterWiringCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstRealAdapterWiringCandidateModel()} />;
}
