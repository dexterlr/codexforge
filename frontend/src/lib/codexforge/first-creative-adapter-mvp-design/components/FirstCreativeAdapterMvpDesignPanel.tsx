"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstCreativeAdapterMvpDesignModel } from "@/lib/codexforge/first-creative-adapter-mvp-design";

export function FirstCreativeAdapterMvpDesignPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstCreativeAdapterMvpDesignModel()} />;
}
