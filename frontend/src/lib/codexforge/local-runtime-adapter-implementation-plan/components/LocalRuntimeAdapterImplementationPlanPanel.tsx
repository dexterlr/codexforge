"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildLocalRuntimeAdapterImplementationPlanModel } from "@/lib/codexforge/local-runtime-adapter-implementation-plan";

export function LocalRuntimeAdapterImplementationPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildLocalRuntimeAdapterImplementationPlanModel()} />;
}
