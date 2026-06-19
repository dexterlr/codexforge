"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildControlledModelUseCandidateModel } from "@/lib/codexforge/controlled-model-use-candidate";

export function ControlledModelUseCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildControlledModelUseCandidateModel()} />;
}
