"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProjectScaffoldEvidenceReviewModel } from "@/lib/codexforge/project-scaffold-evidence-review";

export function ProjectScaffoldEvidenceReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProjectScaffoldEvidenceReviewModel()} />;
}
