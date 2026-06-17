"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildConnectorAdapterContractReviewModel } from "@/lib/codexforge/connector-adapter-contract-review";

export function ConnectorAdapterContractReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildConnectorAdapterContractReviewModel()} />;
}
