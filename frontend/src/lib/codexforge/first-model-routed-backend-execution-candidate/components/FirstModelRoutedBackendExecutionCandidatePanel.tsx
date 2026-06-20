"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstModelRoutedBackendExecutionCandidateModel } from "@/lib/codexforge/first-model-routed-backend-execution-candidate";

export function FirstModelRoutedBackendExecutionCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstModelRoutedBackendExecutionCandidateModel()} />;
}
