"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildSharedMemoryHandoffValidationModel } from "@/lib/codexforge/shared-memory-handoff-validation";

export function SharedMemoryHandoffValidationPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildSharedMemoryHandoffValidationModel()} />;
}

