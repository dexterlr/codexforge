"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAdapterImplementationSandboxReviewModel } from "@/lib/codexforge/adapter-implementation-sandbox-review";

export function AdapterImplementationSandboxReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAdapterImplementationSandboxReviewModel()} />;
}
