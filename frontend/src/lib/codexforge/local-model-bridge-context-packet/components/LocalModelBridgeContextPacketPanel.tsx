"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildLocalModelBridgeContextPacketModel } from "@/lib/codexforge/local-model-bridge-context-packet";

export function LocalModelBridgeContextPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildLocalModelBridgeContextPacketModel()} />;
}
