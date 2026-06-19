"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAdapterExecutionDryRunPacketModel } from "@/lib/codexforge/adapter-execution-dry-run-packet";

export function AdapterExecutionDryRunPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAdapterExecutionDryRunPacketModel()} />;
}
