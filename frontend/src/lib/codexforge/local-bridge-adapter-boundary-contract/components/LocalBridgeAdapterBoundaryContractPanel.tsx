"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildLocalBridgeAdapterBoundaryContractModel } from "@/lib/codexforge/local-bridge-adapter-boundary-contract";

export function LocalBridgeAdapterBoundaryContractPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildLocalBridgeAdapterBoundaryContractModel()} />;
}
