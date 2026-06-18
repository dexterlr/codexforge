"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildEvidenceStoreAdapterImplementationSliceModel } from "@/lib/codexforge/evidence-store-adapter-implementation-slice";

export function EvidenceStoreAdapterImplementationSlicePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildEvidenceStoreAdapterImplementationSliceModel()} />;
}
