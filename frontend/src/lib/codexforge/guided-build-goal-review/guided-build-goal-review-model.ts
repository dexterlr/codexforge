import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GUIDED_BUILD_GOAL_REVIEW_LANGUAGE,
  buildGuidedBuildWorkflowReview,
  buildGuidedBuildWorkflowReviewBoundary,
  buildGuidedBuildWorkflowReviewModelForSlug,
  buildGuidedBuildWorkflowReviewPackets,
  buildGuidedBuildWorkflowReviewStableKey as buildGuidedBuildGoalReviewStableKey,
  summarizeGuidedBuildWorkflowReviewForSlug,
  type GuidedBuildWorkflowReviewPacketInput,
} from "../guided-build-workflow-preview-kit";

export { GUIDED_BUILD_GOAL_REVIEW_LANGUAGE, buildGuidedBuildGoalReviewStableKey };

const GUIDED_BUILD_GOAL_REVIEW_SLUG = "guided-build-goal-review";

export function buildGuidedBuildGoalReview(input: GuidedBuildWorkflowReviewPacketInput): UniversalExecutionReviewPacket {
  return buildGuidedBuildWorkflowReview(GUIDED_BUILD_GOAL_REVIEW_SLUG, input);
}

export function buildGuidedBuildGoalReviewItems(): UniversalExecutionReviewPacket[] {
  return buildGuidedBuildWorkflowReviewPackets(GUIDED_BUILD_GOAL_REVIEW_SLUG);
}

export function buildGuidedBuildGoalReviewBoundary() {
  return buildGuidedBuildWorkflowReviewBoundary();
}

export function summarizeGuidedBuildGoalReview(model: { guidedBuildGoalReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeGuidedBuildWorkflowReviewForSlug(GUIDED_BUILD_GOAL_REVIEW_SLUG, model.guidedBuildGoalReviewItems);
}

export function buildGuidedBuildGoalReviewModel() {
  const guidedBuildGoalReviewItems = buildGuidedBuildGoalReviewItems();
  const guidedBuildGoalReviewModel = buildGuidedBuildWorkflowReviewModelForSlug(GUIDED_BUILD_GOAL_REVIEW_SLUG, guidedBuildGoalReviewItems);
  return { ...guidedBuildGoalReviewModel, guidedBuildGoalReviewItems };
}

