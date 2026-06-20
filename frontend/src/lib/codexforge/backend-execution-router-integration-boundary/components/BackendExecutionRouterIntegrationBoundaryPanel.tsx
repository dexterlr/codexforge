"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildBackendExecutionRouterIntegrationBoundaryModel } from "@/lib/codexforge/backend-execution-router-integration-boundary";

export function BackendExecutionRouterIntegrationBoundaryPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBackendExecutionRouterIntegrationBoundaryModel()} />;
}
