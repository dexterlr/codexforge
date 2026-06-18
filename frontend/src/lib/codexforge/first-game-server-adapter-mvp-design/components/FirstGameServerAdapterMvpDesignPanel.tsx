"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstGameServerAdapterMvpDesignModel } from "@/lib/codexforge/first-game-server-adapter-mvp-design";

export function FirstGameServerAdapterMvpDesignPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstGameServerAdapterMvpDesignModel()} />;
}
