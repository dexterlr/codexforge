"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProjectScaffoldModelRoutedExecutionPreviewModel } from "@/lib/codexforge/project-scaffold-model-routed-execution-preview";

export function ProjectScaffoldModelRoutedExecutionPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProjectScaffoldModelRoutedExecutionPreviewModel()} />;
}
