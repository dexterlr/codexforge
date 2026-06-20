import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_USEFUL_PROJECT_BUILDER_CANDIDATE_LANGUAGE,
  buildProjectBuilderMvpReview,
  buildProjectBuilderMvpReviewBoundary,
  buildProjectBuilderMvpReviewModelForSlug,
  buildProjectBuilderMvpReviewPackets,
  buildProjectBuilderMvpReviewStableKey as buildFirstUsefulProjectBuilderCandidateStableKey,
  summarizeProjectBuilderMvpReviewForSlug,
  type ProjectBuilderMvpReviewPacketInput,
} from "../project-builder-mvp-preview-kit";

export { FIRST_USEFUL_PROJECT_BUILDER_CANDIDATE_LANGUAGE, buildFirstUsefulProjectBuilderCandidateStableKey };

const FIRST_USEFUL_PROJECT_BUILDER_CANDIDATE_SLUG = "first-useful-project-builder-candidate";

export function buildFirstUsefulProjectBuilderCandidate(input: ProjectBuilderMvpReviewPacketInput): UniversalExecutionReviewPacket {
  return buildProjectBuilderMvpReview(FIRST_USEFUL_PROJECT_BUILDER_CANDIDATE_SLUG, input);
}

export function buildFirstUsefulProjectBuilderCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildProjectBuilderMvpReviewPackets(FIRST_USEFUL_PROJECT_BUILDER_CANDIDATE_SLUG);
}

export function buildFirstUsefulProjectBuilderCandidateBoundary() {
  return buildProjectBuilderMvpReviewBoundary();
}

export function summarizeFirstUsefulProjectBuilderCandidate(model: { firstUsefulProjectBuilderCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeProjectBuilderMvpReviewForSlug(FIRST_USEFUL_PROJECT_BUILDER_CANDIDATE_SLUG, model.firstUsefulProjectBuilderCandidateItems);
}

export function buildFirstUsefulProjectBuilderCandidateModel() {
  const firstUsefulProjectBuilderCandidateItems = buildFirstUsefulProjectBuilderCandidateItems();
  const firstUsefulProjectBuilderCandidateModel = buildProjectBuilderMvpReviewModelForSlug(FIRST_USEFUL_PROJECT_BUILDER_CANDIDATE_SLUG, firstUsefulProjectBuilderCandidateItems);
  return { ...firstUsefulProjectBuilderCandidateModel, firstUsefulProjectBuilderCandidateItems };
}
