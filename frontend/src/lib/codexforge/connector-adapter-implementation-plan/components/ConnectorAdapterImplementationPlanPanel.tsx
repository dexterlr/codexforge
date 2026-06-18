"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildConnectorAdapterImplementationPlanModel } from "@/lib/codexforge/connector-adapter-implementation-plan";

export function ConnectorAdapterImplementationPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildConnectorAdapterImplementationPlanModel()} />;
}
