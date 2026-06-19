"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildLocalRuntimeBackendDryRunPacketModel } from "@/lib/codexforge/local-runtime-backend-dry-run-packet";

export function LocalRuntimeBackendDryRunPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildLocalRuntimeBackendDryRunPacketModel()} />;
}
