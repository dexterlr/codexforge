"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstRecoveryAdapterMvpDesignModel } from "@/lib/codexforge/first-recovery-adapter-mvp-design";

export function FirstRecoveryAdapterMvpDesignPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstRecoveryAdapterMvpDesignModel()} />;
}
