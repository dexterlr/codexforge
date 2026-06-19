"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProjectScaffoldBackendDryRunPacketModel } from "@/lib/codexforge/project-scaffold-backend-dry-run-packet";

export function ProjectScaffoldBackendDryRunPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProjectScaffoldBackendDryRunPacketModel()} />;
}
