"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstResearchAdapterMvpDesignModel } from "@/lib/codexforge/first-research-adapter-mvp-design";

export function FirstResearchAdapterMvpDesignPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstResearchAdapterMvpDesignModel()} />;
}
