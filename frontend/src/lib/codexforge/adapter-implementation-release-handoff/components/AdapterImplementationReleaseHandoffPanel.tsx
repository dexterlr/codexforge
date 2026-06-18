"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildAdapterImplementationReleaseHandoffModel } from "@/lib/codexforge/adapter-implementation-release-handoff";

export function AdapterImplementationReleaseHandoffPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildAdapterImplementationReleaseHandoffModel()} />;
}
