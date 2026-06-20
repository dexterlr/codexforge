"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildControlledBackendModelRouterReleaseCandidateModel } from "@/lib/codexforge/controlled-backend-model-router-release-candidate";

export function ControlledBackendModelRouterReleaseCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildControlledBackendModelRouterReleaseCandidateModel()} />;
}
