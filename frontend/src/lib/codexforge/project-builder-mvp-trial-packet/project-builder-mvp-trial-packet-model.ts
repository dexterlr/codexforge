import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PROJECT_BUILDER_MVP_TRIAL_PACKET_LANGUAGE,
  buildProjectBuilderMvpReview,
  buildProjectBuilderMvpReviewBoundary,
  buildProjectBuilderMvpReviewModelForSlug,
  buildProjectBuilderMvpReviewPackets,
  buildProjectBuilderMvpReviewStableKey as buildProjectBuilderMvpTrialPacketStableKey,
  summarizeProjectBuilderMvpReviewForSlug,
  type ProjectBuilderMvpReviewPacketInput,
} from "../project-builder-mvp-preview-kit";

export { PROJECT_BUILDER_MVP_TRIAL_PACKET_LANGUAGE, buildProjectBuilderMvpTrialPacketStableKey };

const PROJECT_BUILDER_MVP_TRIAL_PACKET_SLUG = "project-builder-mvp-trial-packet";

export function buildProjectBuilderMvpTrialPacket(input: ProjectBuilderMvpReviewPacketInput): UniversalExecutionReviewPacket {
  return buildProjectBuilderMvpReview(PROJECT_BUILDER_MVP_TRIAL_PACKET_SLUG, input);
}

export function buildProjectBuilderMvpTrialPacketItems(): UniversalExecutionReviewPacket[] {
  return buildProjectBuilderMvpReviewPackets(PROJECT_BUILDER_MVP_TRIAL_PACKET_SLUG);
}

export function buildProjectBuilderMvpTrialPacketBoundary() {
  return buildProjectBuilderMvpReviewBoundary();
}

export function summarizeProjectBuilderMvpTrialPacket(model: { projectBuilderMvpTrialPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeProjectBuilderMvpReviewForSlug(PROJECT_BUILDER_MVP_TRIAL_PACKET_SLUG, model.projectBuilderMvpTrialPacketItems);
}

export function buildProjectBuilderMvpTrialPacketModel() {
  const projectBuilderMvpTrialPacketItems = buildProjectBuilderMvpTrialPacketItems();
  const projectBuilderMvpTrialPacketModel = buildProjectBuilderMvpReviewModelForSlug(PROJECT_BUILDER_MVP_TRIAL_PACKET_SLUG, projectBuilderMvpTrialPacketItems);
  return { ...projectBuilderMvpTrialPacketModel, projectBuilderMvpTrialPacketItems };
}
