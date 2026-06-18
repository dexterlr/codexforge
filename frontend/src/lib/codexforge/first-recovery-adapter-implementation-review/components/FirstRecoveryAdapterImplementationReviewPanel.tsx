"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstRecoveryAdapterImplementationReviewModel } from "@/lib/codexforge/first-recovery-adapter-implementation-review";

export function FirstRecoveryAdapterImplementationReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstRecoveryAdapterImplementationReviewModel()} />;
}
