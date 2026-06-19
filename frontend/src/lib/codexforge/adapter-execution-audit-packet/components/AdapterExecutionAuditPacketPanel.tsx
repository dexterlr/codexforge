"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAdapterExecutionAuditPacketModel } from "@/lib/codexforge/adapter-execution-audit-packet";

export function AdapterExecutionAuditPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAdapterExecutionAuditPacketModel()} />;
}
