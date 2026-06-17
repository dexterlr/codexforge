"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFileWriteAdapterContractReviewModel } from "@/lib/codexforge/file-write-adapter-contract-review";

export function FileWriteAdapterContractReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFileWriteAdapterContractReviewModel()} />;
}
