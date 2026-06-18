"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstLocalRuntimeAdapterMvpDesignModel } from "@/lib/codexforge/first-local-runtime-adapter-mvp-design";

export function FirstLocalRuntimeAdapterMvpDesignPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstLocalRuntimeAdapterMvpDesignModel()} />;
}
