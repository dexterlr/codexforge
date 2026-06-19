"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelSelectionApprovalPacketModel } from "@/lib/codexforge/model-selection-approval-packet";

export function ModelSelectionApprovalPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelSelectionApprovalPacketModel()} />;
}
