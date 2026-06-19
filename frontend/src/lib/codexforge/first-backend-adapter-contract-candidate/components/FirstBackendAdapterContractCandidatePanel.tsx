"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstBackendAdapterContractCandidateModel } from "@/lib/codexforge/first-backend-adapter-contract-candidate";

export function FirstBackendAdapterContractCandidatePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstBackendAdapterContractCandidateModel()} />;
}
