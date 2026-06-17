"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildExecutionAdapterContractInventoryModel } from "@/lib/codexforge/execution-adapter-contract-inventory";

export function ExecutionAdapterContractInventoryPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildExecutionAdapterContractInventoryModel()} />;
}
