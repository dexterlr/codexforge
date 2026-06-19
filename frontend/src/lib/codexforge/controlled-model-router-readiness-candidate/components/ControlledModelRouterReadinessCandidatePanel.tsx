"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildControlledModelRouterReadinessCandidateModel } from "@/lib/codexforge/controlled-model-router-readiness-candidate";

export function ControlledModelRouterReadinessCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildControlledModelRouterReadinessCandidateModel()} />;
}
