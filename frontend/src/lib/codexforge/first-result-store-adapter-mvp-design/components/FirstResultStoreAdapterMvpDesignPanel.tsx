"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstResultStoreAdapterMvpDesignModel } from "@/lib/codexforge/first-result-store-adapter-mvp-design";

export function FirstResultStoreAdapterMvpDesignPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstResultStoreAdapterMvpDesignModel()} />;
}
