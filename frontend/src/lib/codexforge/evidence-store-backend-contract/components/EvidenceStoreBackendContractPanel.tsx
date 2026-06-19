"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildEvidenceStoreBackendContractModel } from "@/lib/codexforge/evidence-store-backend-contract";

export function EvidenceStoreBackendContractPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildEvidenceStoreBackendContractModel()} />;
}
