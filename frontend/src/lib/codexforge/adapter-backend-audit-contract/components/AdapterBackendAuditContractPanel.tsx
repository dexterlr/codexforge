"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAdapterBackendAuditContractModel } from "@/lib/codexforge/adapter-backend-audit-contract";

export function AdapterBackendAuditContractPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAdapterBackendAuditContractModel()} />;
}
