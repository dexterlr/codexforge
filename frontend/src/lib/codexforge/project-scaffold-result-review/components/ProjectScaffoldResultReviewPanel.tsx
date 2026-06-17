"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProjectScaffoldResultReviewModel } from "@/lib/codexforge/project-scaffold-result-review";

export function ProjectScaffoldResultReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProjectScaffoldResultReviewModel()} />;
}
