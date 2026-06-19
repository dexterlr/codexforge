"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAdapterExecutionSandboxPacketModel } from "@/lib/codexforge/adapter-execution-sandbox-packet";

export function AdapterExecutionSandboxPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAdapterExecutionSandboxPacketModel()} />;
}
