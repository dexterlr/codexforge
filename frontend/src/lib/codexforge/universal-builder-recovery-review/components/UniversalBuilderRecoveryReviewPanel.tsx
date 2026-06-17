"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildUniversalBuilderRecoveryReviewModel } from "@/lib/codexforge/universal-builder-recovery-review";

export function UniversalBuilderRecoveryReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildUniversalBuilderRecoveryReviewModel()} />;
}
