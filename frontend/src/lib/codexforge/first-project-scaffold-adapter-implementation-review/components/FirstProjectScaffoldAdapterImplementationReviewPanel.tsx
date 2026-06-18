"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstProjectScaffoldAdapterImplementationReviewModel } from "@/lib/codexforge/first-project-scaffold-adapter-implementation-review";

export function FirstProjectScaffoldAdapterImplementationReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstProjectScaffoldAdapterImplementationReviewModel()} />;
}
