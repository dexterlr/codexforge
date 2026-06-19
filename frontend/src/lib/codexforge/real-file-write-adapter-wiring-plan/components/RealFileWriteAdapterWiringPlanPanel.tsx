"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildRealFileWriteAdapterWiringPlanModel } from "@/lib/codexforge/real-file-write-adapter-wiring-plan";

export function RealFileWriteAdapterWiringPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildRealFileWriteAdapterWiringPlanModel()} />;
}
