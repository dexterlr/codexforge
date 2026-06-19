"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProjectScaffoldBackendContractModel } from "@/lib/codexforge/project-scaffold-backend-contract";

export function ProjectScaffoldBackendContractPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProjectScaffoldBackendContractModel()} />;
}
