"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildControlledModelRouterBetaReleaseCandidateModel } from "@/lib/codexforge/controlled-model-router-beta-release-candidate";

export function ControlledModelRouterBetaReleaseCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildControlledModelRouterBetaReleaseCandidateModel()} />;
}
