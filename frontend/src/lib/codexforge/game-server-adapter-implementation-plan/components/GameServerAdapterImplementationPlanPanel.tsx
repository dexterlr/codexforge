"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildGameServerAdapterImplementationPlanModel } from "@/lib/codexforge/game-server-adapter-implementation-plan";

export function GameServerAdapterImplementationPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildGameServerAdapterImplementationPlanModel()} />;
}
