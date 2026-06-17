"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProjectScaffoldRecoveryReviewModel } from "@/lib/codexforge/project-scaffold-recovery-review";

export function ProjectScaffoldRecoveryReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProjectScaffoldRecoveryReviewModel()} />;
}
