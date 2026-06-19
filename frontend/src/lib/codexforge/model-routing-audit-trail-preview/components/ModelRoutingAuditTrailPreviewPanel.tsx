"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelRoutingAuditTrailPreviewModel } from "@/lib/codexforge/model-routing-audit-trail-preview";

export function ModelRoutingAuditTrailPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelRoutingAuditTrailPreviewModel()} />;
}
