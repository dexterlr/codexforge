"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstProjectScaffoldAdapterMvpDesignModel } from "@/lib/codexforge/first-project-scaffold-adapter-mvp-design";

export function FirstProjectScaffoldAdapterMvpDesignPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstProjectScaffoldAdapterMvpDesignModel()} />;
}
