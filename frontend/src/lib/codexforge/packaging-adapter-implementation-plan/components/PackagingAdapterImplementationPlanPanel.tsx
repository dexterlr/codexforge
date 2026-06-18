"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildPackagingAdapterImplementationPlanModel } from "@/lib/codexforge/packaging-adapter-implementation-plan";

export function PackagingAdapterImplementationPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildPackagingAdapterImplementationPlanModel()} />;
}
