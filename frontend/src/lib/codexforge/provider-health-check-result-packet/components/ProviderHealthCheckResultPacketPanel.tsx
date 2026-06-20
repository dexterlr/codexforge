"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProviderHealthCheckResultPacketModel } from "@/lib/codexforge/provider-health-check-result-packet";

export function ProviderHealthCheckResultPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProviderHealthCheckResultPacketModel()} />;
}
