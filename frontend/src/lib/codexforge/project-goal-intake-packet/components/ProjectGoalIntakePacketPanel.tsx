"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildProjectGoalIntakePacketModel } from "@/lib/codexforge/project-goal-intake-packet";

export function ProjectGoalIntakePacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildProjectGoalIntakePacketModel()} />;
}
