"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildRealAdapterApprovalWiringPlanModel } from "@/lib/codexforge/real-adapter-approval-wiring-plan";

export function RealAdapterApprovalWiringPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildRealAdapterApprovalWiringPlanModel()} />;
}
