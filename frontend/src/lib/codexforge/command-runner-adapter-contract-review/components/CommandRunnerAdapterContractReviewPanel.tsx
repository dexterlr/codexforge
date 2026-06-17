"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildCommandRunnerAdapterContractReviewModel } from "@/lib/codexforge/command-runner-adapter-contract-review";

export function CommandRunnerAdapterContractReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildCommandRunnerAdapterContractReviewModel()} />;
}
