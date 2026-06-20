"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildLiveProviderReadinessBoundaryModel } from "@/lib/codexforge/live-provider-readiness-boundary";

export function LiveProviderReadinessBoundaryPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildLiveProviderReadinessBoundaryModel()} />;
}
