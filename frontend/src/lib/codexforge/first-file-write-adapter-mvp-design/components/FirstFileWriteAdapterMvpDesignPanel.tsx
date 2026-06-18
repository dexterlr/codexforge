"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstFileWriteAdapterMvpDesignModel } from "@/lib/codexforge/first-file-write-adapter-mvp-design";

export function FirstFileWriteAdapterMvpDesignPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstFileWriteAdapterMvpDesignModel()} />;
}
