"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAdapterImplementationRecoveryReviewModel } from "@/lib/codexforge/adapter-implementation-recovery-review";

export function AdapterImplementationRecoveryReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAdapterImplementationRecoveryReviewModel()} />;
}
