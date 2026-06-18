"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstFileWriteAdapterImplementationReviewModel } from "@/lib/codexforge/first-file-write-adapter-implementation-review";

export function FirstFileWriteAdapterImplementationReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstFileWriteAdapterImplementationReviewModel()} />;
}
