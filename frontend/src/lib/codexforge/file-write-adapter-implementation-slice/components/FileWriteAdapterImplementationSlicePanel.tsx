"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFileWriteAdapterImplementationSliceModel } from "@/lib/codexforge/file-write-adapter-implementation-slice";

export function FileWriteAdapterImplementationSlicePanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFileWriteAdapterImplementationSliceModel()} />;
}
