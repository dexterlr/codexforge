"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildPaidModelUseDryRunModel } from "@/lib/codexforge/paid-model-use-dry-run";

export function PaidModelUseDryRunPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildPaidModelUseDryRunModel()} />;
}

