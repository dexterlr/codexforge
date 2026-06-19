"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildRecoveryBackendDryRunPacketModel } from "@/lib/codexforge/recovery-backend-dry-run-packet";

export function RecoveryBackendDryRunPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildRecoveryBackendDryRunPacketModel()} />;
}
