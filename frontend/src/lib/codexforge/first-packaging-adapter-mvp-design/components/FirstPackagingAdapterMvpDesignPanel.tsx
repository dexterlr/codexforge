"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstPackagingAdapterMvpDesignModel } from "@/lib/codexforge/first-packaging-adapter-mvp-design";

export function FirstPackagingAdapterMvpDesignPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstPackagingAdapterMvpDesignModel()} />;
}
