"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFileWriteAdapterImplementationPlanModel } from "@/lib/codexforge/file-write-adapter-implementation-plan";

export function FileWriteAdapterImplementationPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFileWriteAdapterImplementationPlanModel()} />;
}
