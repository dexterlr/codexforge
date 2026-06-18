"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildUniversalAdapterBackedExecutionPreviewCandidateModel } from "@/lib/codexforge/universal-adapter-backed-execution-preview-candidate";

export function UniversalAdapterBackedExecutionPreviewCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalAdapterBackedExecutionPreviewCandidateModel()} />;
}
