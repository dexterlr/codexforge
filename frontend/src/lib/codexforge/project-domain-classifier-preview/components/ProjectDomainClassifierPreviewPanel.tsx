"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProjectDomainClassifierPreviewModel } from "@/lib/codexforge/project-domain-classifier-preview";

export function ProjectDomainClassifierPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProjectDomainClassifierPreviewModel()} />;
}
