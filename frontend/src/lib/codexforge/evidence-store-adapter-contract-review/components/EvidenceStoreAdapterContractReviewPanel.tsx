"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildEvidenceStoreAdapterContractReviewModel } from "@/lib/codexforge/evidence-store-adapter-contract-review";

export function EvidenceStoreAdapterContractReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildEvidenceStoreAdapterContractReviewModel()} />;
}
