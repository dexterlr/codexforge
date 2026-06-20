"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProjectBuilderMvpTrialPacketModel } from "@/lib/codexforge/project-builder-mvp-trial-packet";

export function ProjectBuilderMvpTrialPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProjectBuilderMvpTrialPacketModel()} />;
}
