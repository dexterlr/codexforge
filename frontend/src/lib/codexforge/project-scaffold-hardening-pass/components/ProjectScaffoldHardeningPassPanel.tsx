"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProjectScaffoldHardeningPassModel } from "@/lib/codexforge/project-scaffold-hardening-pass";

export function ProjectScaffoldHardeningPassPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProjectScaffoldHardeningPassModel()} />;
}
