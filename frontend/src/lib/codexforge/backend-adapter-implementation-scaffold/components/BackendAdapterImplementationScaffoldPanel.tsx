"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildBackendAdapterImplementationScaffoldModel } from "@/lib/codexforge/backend-adapter-implementation-scaffold";

export function BackendAdapterImplementationScaffoldPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBackendAdapterImplementationScaffoldModel()} />;
}
