"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildApprovedProviderTestPacketModel } from "@/lib/codexforge/approved-provider-test-packet";

export function ApprovedProviderTestPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildApprovedProviderTestPacketModel()} />;
}
