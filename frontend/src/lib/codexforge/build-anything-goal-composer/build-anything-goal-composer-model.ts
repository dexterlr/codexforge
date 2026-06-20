import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_ANYTHING_GOAL_COMPOSER_LANGUAGE,
  buildUniversalBuilderCockpitReview,
  buildUniversalBuilderCockpitReviewBoundary,
  buildUniversalBuilderCockpitReviewModelForSlug,
  buildUniversalBuilderCockpitReviewPackets,
  buildUniversalBuilderCockpitReviewStableKey as buildBuildAnythingGoalComposerStableKey,
  summarizeUniversalBuilderCockpitReviewForSlug,
  type UniversalBuilderCockpitReviewPacketInput,
} from "../universal-builder-cockpit-preview-kit";

export { BUILD_ANYTHING_GOAL_COMPOSER_LANGUAGE, buildBuildAnythingGoalComposerStableKey };

const BUILD_ANYTHING_GOAL_COMPOSER_SLUG = "build-anything-goal-composer";

export function buildBuildAnythingGoalComposer(input: UniversalBuilderCockpitReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalBuilderCockpitReview(BUILD_ANYTHING_GOAL_COMPOSER_SLUG, input);
}

export function buildBuildAnythingGoalComposerItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalBuilderCockpitReviewPackets(BUILD_ANYTHING_GOAL_COMPOSER_SLUG);
}

export function buildBuildAnythingGoalComposerBoundary() {
  return buildUniversalBuilderCockpitReviewBoundary();
}

export function summarizeBuildAnythingGoalComposer(model: { buildAnythingGoalComposerItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalBuilderCockpitReviewForSlug(BUILD_ANYTHING_GOAL_COMPOSER_SLUG, model.buildAnythingGoalComposerItems);
}

export function buildBuildAnythingGoalComposerModel() {
  const buildAnythingGoalComposerItems = buildBuildAnythingGoalComposerItems();
  const buildAnythingGoalComposerModel = buildUniversalBuilderCockpitReviewModelForSlug(BUILD_ANYTHING_GOAL_COMPOSER_SLUG, buildAnythingGoalComposerItems);
  return { ...buildAnythingGoalComposerModel, buildAnythingGoalComposerItems };
}
