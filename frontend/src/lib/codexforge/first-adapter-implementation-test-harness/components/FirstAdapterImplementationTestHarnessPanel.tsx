"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstAdapterImplementationTestHarnessModel } from "@/lib/codexforge/first-adapter-implementation-test-harness";

export function FirstAdapterImplementationTestHarnessPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstAdapterImplementationTestHarnessModel()} />;
}
