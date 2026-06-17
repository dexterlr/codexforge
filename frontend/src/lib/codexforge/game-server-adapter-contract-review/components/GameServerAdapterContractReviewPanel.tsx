"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildGameServerAdapterContractReviewModel } from "@/lib/codexforge/game-server-adapter-contract-review";

export function GameServerAdapterContractReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildGameServerAdapterContractReviewModel()} />;
}
