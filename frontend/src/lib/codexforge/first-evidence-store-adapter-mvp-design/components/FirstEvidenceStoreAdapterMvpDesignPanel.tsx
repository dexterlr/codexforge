"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstEvidenceStoreAdapterMvpDesignModel } from "@/lib/codexforge/first-evidence-store-adapter-mvp-design";

export function FirstEvidenceStoreAdapterMvpDesignPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstEvidenceStoreAdapterMvpDesignModel()} />;
}
