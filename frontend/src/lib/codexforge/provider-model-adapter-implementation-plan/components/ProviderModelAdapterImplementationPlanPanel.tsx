"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProviderModelAdapterImplementationPlanModel } from "@/lib/codexforge/provider-model-adapter-implementation-plan";

export function ProviderModelAdapterImplementationPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProviderModelAdapterImplementationPlanModel()} />;
}
