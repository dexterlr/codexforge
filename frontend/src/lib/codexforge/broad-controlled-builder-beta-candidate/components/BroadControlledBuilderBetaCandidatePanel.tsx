"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildBroadControlledBuilderBetaCandidateModel } from "@/lib/codexforge/broad-controlled-builder-beta-candidate";

export function BroadControlledBuilderBetaCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBroadControlledBuilderBetaCandidateModel()} />;
}
