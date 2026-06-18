"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProjectScaffoldAdapterImplementationSliceModel } from "@/lib/codexforge/project-scaffold-adapter-implementation-slice";

export function ProjectScaffoldAdapterImplementationSlicePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProjectScaffoldAdapterImplementationSliceModel()} />;
}
