"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAdapterExecutionValidationPacketModel } from "@/lib/codexforge/adapter-execution-validation-packet";

export function AdapterExecutionValidationPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAdapterExecutionValidationPacketModel()} />;
}
