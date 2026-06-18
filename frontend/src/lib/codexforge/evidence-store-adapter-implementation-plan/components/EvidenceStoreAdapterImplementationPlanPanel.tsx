"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildEvidenceStoreAdapterImplementationPlanModel } from "@/lib/codexforge/evidence-store-adapter-implementation-plan";

export function EvidenceStoreAdapterImplementationPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildEvidenceStoreAdapterImplementationPlanModel()} />;
}
