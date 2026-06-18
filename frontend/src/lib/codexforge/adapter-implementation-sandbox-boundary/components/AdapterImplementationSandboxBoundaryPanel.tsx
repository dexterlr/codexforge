"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAdapterImplementationSandboxBoundaryModel } from "@/lib/codexforge/adapter-implementation-sandbox-boundary";

export function AdapterImplementationSandboxBoundaryPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAdapterImplementationSandboxBoundaryModel()} />;
}
