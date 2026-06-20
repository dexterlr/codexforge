"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelRoutedExecutionAuditPacketModel } from "@/lib/codexforge/model-routed-execution-audit-packet";

export function ModelRoutedExecutionAuditPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelRoutedExecutionAuditPacketModel()} />;
}
