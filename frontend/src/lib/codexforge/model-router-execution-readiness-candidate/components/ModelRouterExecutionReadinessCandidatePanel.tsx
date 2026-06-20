"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelRouterExecutionReadinessCandidateModel } from "@/lib/codexforge/model-router-execution-readiness-candidate";

export function ModelRouterExecutionReadinessCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelRouterExecutionReadinessCandidateModel()} />;
}
