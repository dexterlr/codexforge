"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildLocalRuntimeAdapterBackendContractModel } from "@/lib/codexforge/local-runtime-adapter-backend-contract";

export function LocalRuntimeAdapterBackendContractPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildLocalRuntimeAdapterBackendContractModel()} />;
}
