"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildSpecialistModelConnectionTestPreviewModel } from "@/lib/codexforge/specialist-model-connection-test-preview";

export function SpecialistModelConnectionTestPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildSpecialistModelConnectionTestPreviewModel()} />;
}
