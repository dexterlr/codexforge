"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildModelHealthProbePreviewModel } from "@/lib/codexforge/model-health-probe-preview";

export function ModelHealthProbePreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildModelHealthProbePreviewModel()} />;
}
