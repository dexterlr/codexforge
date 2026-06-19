"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAdapterExecutionFailurePacketModel } from "@/lib/codexforge/adapter-execution-failure-packet";

export function AdapterExecutionFailurePacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAdapterExecutionFailurePacketModel()} />;
}
