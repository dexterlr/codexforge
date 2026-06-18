"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildResearchAdapterImplementationPlanModel } from "@/lib/codexforge/research-adapter-implementation-plan";

export function ResearchAdapterImplementationPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildResearchAdapterImplementationPlanModel()} />;
}
