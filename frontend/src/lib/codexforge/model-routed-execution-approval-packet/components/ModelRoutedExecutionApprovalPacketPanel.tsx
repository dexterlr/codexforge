"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelRoutedExecutionApprovalPacketModel } from "@/lib/codexforge/model-routed-execution-approval-packet";

export function ModelRoutedExecutionApprovalPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelRoutedExecutionApprovalPacketModel()} />;
}
