import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  CONTROLLED_PROJECT_BUILDER_RELEASE_CANDIDATE_LANGUAGE,
  buildProjectBuilderMvpReview,
  buildProjectBuilderMvpReviewBoundary,
  buildProjectBuilderMvpReviewModelForSlug,
  buildProjectBuilderMvpReviewPackets,
  buildProjectBuilderMvpReviewStableKey as buildControlledProjectBuilderReleaseCandidateStableKey,
  summarizeProjectBuilderMvpReviewForSlug,
  type ProjectBuilderMvpReviewPacketInput,
} from "../project-builder-mvp-preview-kit";

export { CONTROLLED_PROJECT_BUILDER_RELEASE_CANDIDATE_LANGUAGE, buildControlledProjectBuilderReleaseCandidateStableKey };

const CONTROLLED_PROJECT_BUILDER_RELEASE_CANDIDATE_SLUG = "controlled-project-builder-release-candidate";

export function buildControlledProjectBuilderReleaseCandidate(input: ProjectBuilderMvpReviewPacketInput): UniversalExecutionReviewPacket {
  return buildProjectBuilderMvpReview(CONTROLLED_PROJECT_BUILDER_RELEASE_CANDIDATE_SLUG, input);
}

export function buildControlledProjectBuilderReleaseCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildProjectBuilderMvpReviewPackets(CONTROLLED_PROJECT_BUILDER_RELEASE_CANDIDATE_SLUG);
}

export function buildControlledProjectBuilderReleaseCandidateBoundary() {
  return buildProjectBuilderMvpReviewBoundary();
}

export function summarizeControlledProjectBuilderReleaseCandidate(model: { controlledProjectBuilderReleaseCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeProjectBuilderMvpReviewForSlug(CONTROLLED_PROJECT_BUILDER_RELEASE_CANDIDATE_SLUG, model.controlledProjectBuilderReleaseCandidateItems);
}

export function buildControlledProjectBuilderReleaseCandidateModel() {
  const controlledProjectBuilderReleaseCandidateItems = buildControlledProjectBuilderReleaseCandidateItems();
  const controlledProjectBuilderReleaseCandidateModel = buildProjectBuilderMvpReviewModelForSlug(CONTROLLED_PROJECT_BUILDER_RELEASE_CANDIDATE_SLUG, controlledProjectBuilderReleaseCandidateItems);
  return { ...controlledProjectBuilderReleaseCandidateModel, controlledProjectBuilderReleaseCandidateItems };
}
