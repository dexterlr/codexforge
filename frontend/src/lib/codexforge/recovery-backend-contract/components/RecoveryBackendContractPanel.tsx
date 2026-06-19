"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildRecoveryBackendContractModel } from "@/lib/codexforge/recovery-backend-contract";

export function RecoveryBackendContractPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildRecoveryBackendContractModel()} />;
}
