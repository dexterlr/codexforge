"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildGameServerAdapterPreviewModel } from "@/lib/codexforge/game-server-adapter-preview";

export function GameServerAdapterPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildGameServerAdapterPreviewModel()} />;
}
