"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildBoundedAdapterImplementationReadinessModel } from "@/lib/codexforge/bounded-adapter-implementation-readiness";

export function BoundedAdapterImplementationReadinessPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildBoundedAdapterImplementationReadinessModel()} />;
}
