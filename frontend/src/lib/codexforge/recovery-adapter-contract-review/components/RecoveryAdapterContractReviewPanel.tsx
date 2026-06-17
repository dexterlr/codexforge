"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildRecoveryAdapterContractReviewModel } from "@/lib/codexforge/recovery-adapter-contract-review";

export function RecoveryAdapterContractReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildRecoveryAdapterContractReviewModel()} />;
}
