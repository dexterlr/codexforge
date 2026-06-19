"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAdapterExecutionApprovalPacketModel } from "@/lib/codexforge/adapter-execution-approval-packet";

export function AdapterExecutionApprovalPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAdapterExecutionApprovalPacketModel()} />;
}
