"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildCommandRunnerAdapterBackendContractModel } from "@/lib/codexforge/command-runner-adapter-backend-contract";

export function CommandRunnerAdapterBackendContractPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildCommandRunnerAdapterBackendContractModel()} />;
}
