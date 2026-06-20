"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProjectBuilderMvpIntegrationBoundaryModel } from "@/lib/codexforge/project-builder-mvp-integration-boundary";

export function ProjectBuilderMvpIntegrationBoundaryPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProjectBuilderMvpIntegrationBoundaryModel()} />;
}
