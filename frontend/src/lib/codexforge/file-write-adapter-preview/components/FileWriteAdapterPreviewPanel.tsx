"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFileWriteAdapterPreviewModel } from "@/lib/codexforge/file-write-adapter-preview";

export function FileWriteAdapterPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFileWriteAdapterPreviewModel()} />;
}
