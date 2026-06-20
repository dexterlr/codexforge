"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelRouterCandidateRankingReviewModel } from "@/lib/codexforge/model-router-candidate-ranking-review";

export function ModelRouterCandidateRankingReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelRouterCandidateRankingReviewModel()} />;
}
