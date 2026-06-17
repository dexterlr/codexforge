"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProjectScaffoldDryRunPlanModel } from "@/lib/codexforge/project-scaffold-dry-run-plan";

export function ProjectScaffoldDryRunPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProjectScaffoldDryRunPlanModel()} />;
}
