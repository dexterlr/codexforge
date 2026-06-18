"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAutomationAdapterImplementationPlanModel } from "@/lib/codexforge/automation-adapter-implementation-plan";

export function AutomationAdapterImplementationPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAutomationAdapterImplementationPlanModel()} />;
}
