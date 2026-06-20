"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstModelRouterBetaCandidateModel } from "@/lib/codexforge/first-model-router-beta-candidate";

export function FirstModelRouterBetaCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstModelRouterBetaCandidateModel()} />;
}
