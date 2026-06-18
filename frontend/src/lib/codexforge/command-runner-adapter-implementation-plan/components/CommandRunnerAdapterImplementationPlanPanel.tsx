"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildCommandRunnerAdapterImplementationPlanModel } from "@/lib/codexforge/command-runner-adapter-implementation-plan";

export function CommandRunnerAdapterImplementationPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildCommandRunnerAdapterImplementationPlanModel()} />;
}
