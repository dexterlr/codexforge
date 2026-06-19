"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAdapterBackendSandboxContractModel } from "@/lib/codexforge/adapter-backend-sandbox-contract";

export function AdapterBackendSandboxContractPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAdapterBackendSandboxContractModel()} />;
}
