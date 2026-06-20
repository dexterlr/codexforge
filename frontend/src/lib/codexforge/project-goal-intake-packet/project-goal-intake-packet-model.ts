import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PROJECT_GOAL_INTAKE_PACKET_LANGUAGE,
  buildProjectBuilderMvpReview,
  buildProjectBuilderMvpReviewBoundary,
  buildProjectBuilderMvpReviewModelForSlug,
  buildProjectBuilderMvpReviewPackets,
  buildProjectBuilderMvpReviewStableKey as buildProjectGoalIntakePacketStableKey,
  summarizeProjectBuilderMvpReviewForSlug,
  type ProjectBuilderMvpReviewPacketInput,
} from "../project-builder-mvp-preview-kit";

export { PROJECT_GOAL_INTAKE_PACKET_LANGUAGE, buildProjectGoalIntakePacketStableKey };

const PROJECT_GOAL_INTAKE_PACKET_SLUG = "project-goal-intake-packet";

export function buildProjectGoalIntakePacket(input: ProjectBuilderMvpReviewPacketInput): UniversalExecutionReviewPacket {
  return buildProjectBuilderMvpReview(PROJECT_GOAL_INTAKE_PACKET_SLUG, input);
}

export function buildProjectGoalIntakePacketItems(): UniversalExecutionReviewPacket[] {
  return buildProjectBuilderMvpReviewPackets(PROJECT_GOAL_INTAKE_PACKET_SLUG);
}

export function buildProjectGoalIntakePacketBoundary() {
  return buildProjectBuilderMvpReviewBoundary();
}

export function summarizeProjectGoalIntakePacket(model: { projectGoalIntakePacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeProjectBuilderMvpReviewForSlug(PROJECT_GOAL_INTAKE_PACKET_SLUG, model.projectGoalIntakePacketItems);
}

export function buildProjectGoalIntakePacketModel() {
  const projectGoalIntakePacketItems = buildProjectGoalIntakePacketItems();
  const projectGoalIntakePacketModel = buildProjectBuilderMvpReviewModelForSlug(PROJECT_GOAL_INTAKE_PACKET_SLUG, projectGoalIntakePacketItems);
  return { ...projectGoalIntakePacketModel, projectGoalIntakePacketItems };
}
