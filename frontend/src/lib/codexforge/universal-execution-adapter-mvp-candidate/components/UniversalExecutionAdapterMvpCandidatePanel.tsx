"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildUniversalExecutionAdapterMvpCandidateModel } from "@/lib/codexforge/universal-execution-adapter-mvp-candidate";

export function UniversalExecutionAdapterMvpCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalExecutionAdapterMvpCandidateModel()} />;
}
