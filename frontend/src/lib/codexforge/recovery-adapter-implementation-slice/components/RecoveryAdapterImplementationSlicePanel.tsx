"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildRecoveryAdapterImplementationSliceModel } from "@/lib/codexforge/recovery-adapter-implementation-slice";

export function RecoveryAdapterImplementationSlicePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildRecoveryAdapterImplementationSliceModel()} />;
}
