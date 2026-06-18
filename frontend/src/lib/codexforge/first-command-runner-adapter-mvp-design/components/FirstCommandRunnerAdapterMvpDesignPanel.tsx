"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstCommandRunnerAdapterMvpDesignModel } from "@/lib/codexforge/first-command-runner-adapter-mvp-design";

export function FirstCommandRunnerAdapterMvpDesignPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstCommandRunnerAdapterMvpDesignModel()} />;
}
