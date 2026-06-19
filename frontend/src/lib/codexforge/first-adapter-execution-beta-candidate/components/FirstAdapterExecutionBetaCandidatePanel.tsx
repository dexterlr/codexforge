"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstAdapterExecutionBetaCandidateModel } from "@/lib/codexforge/first-adapter-execution-beta-candidate";

export function FirstAdapterExecutionBetaCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstAdapterExecutionBetaCandidateModel()} />;
}
