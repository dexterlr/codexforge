"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelContextSyncPacketModel } from "@/lib/codexforge/model-context-sync-packet";

export function ModelContextSyncPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelContextSyncPacketModel()} />;
}
