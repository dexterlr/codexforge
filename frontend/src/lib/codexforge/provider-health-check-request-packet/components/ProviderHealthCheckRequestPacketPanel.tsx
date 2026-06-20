"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProviderHealthCheckRequestPacketModel } from "@/lib/codexforge/provider-health-check-request-packet";

export function ProviderHealthCheckRequestPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProviderHealthCheckRequestPacketModel()} />;
}
