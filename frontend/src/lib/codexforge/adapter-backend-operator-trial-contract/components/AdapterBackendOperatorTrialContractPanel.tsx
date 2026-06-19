"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAdapterBackendOperatorTrialContractModel } from "@/lib/codexforge/adapter-backend-operator-trial-contract";

export function AdapterBackendOperatorTrialContractPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAdapterBackendOperatorTrialContractModel()} />;
}
