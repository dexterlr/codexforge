"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildCreativeAdapterImplementationPlanModel } from "@/lib/codexforge/creative-adapter-implementation-plan";

export function CreativeAdapterImplementationPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildCreativeAdapterImplementationPlanModel()} />;
}
