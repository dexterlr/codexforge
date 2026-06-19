"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProjectScaffoldBackendAdapterPreviewModel } from "@/lib/codexforge/project-scaffold-backend-adapter-preview";

export function ProjectScaffoldBackendAdapterPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProjectScaffoldBackendAdapterPreviewModel()} />;
}
