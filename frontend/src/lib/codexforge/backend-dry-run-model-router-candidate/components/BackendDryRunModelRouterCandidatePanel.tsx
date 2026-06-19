"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildBackendDryRunModelRouterCandidateModel } from "@/lib/codexforge/backend-dry-run-model-router-candidate";

export function BackendDryRunModelRouterCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBackendDryRunModelRouterCandidateModel()} />;
}
