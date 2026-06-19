"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildRealAdapterAuditWiringPlanModel } from "@/lib/codexforge/real-adapter-audit-wiring-plan";

export function RealAdapterAuditWiringPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildRealAdapterAuditWiringPlanModel()} />;
}
