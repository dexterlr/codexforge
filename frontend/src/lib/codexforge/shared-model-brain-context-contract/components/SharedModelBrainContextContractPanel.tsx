"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildSharedModelBrainContextContractModel } from "@/lib/codexforge/shared-model-brain-context-contract";

export function SharedModelBrainContextContractPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildSharedModelBrainContextContractModel()} />;
}
