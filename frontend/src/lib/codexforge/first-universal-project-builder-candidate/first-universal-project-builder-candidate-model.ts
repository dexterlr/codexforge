import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_UNIVERSAL_PROJECT_BUILDER_CANDIDATE_LANGUAGE,
  buildUniversalProjectBuilderReview,
  buildUniversalProjectBuilderReviewBoundary,
  buildUniversalProjectBuilderReviewModelForSlug,
  buildUniversalProjectBuilderReviewPackets,
  buildUniversalProjectBuilderReviewStableKey as buildFirstUniversalProjectBuilderCandidateStableKey,
  summarizeUniversalProjectBuilderReviewForSlug,
  type UniversalProjectBuilderReviewPacketInput,
} from "../universal-project-builder-preview-kit";

export { FIRST_UNIVERSAL_PROJECT_BUILDER_CANDIDATE_LANGUAGE, buildFirstUniversalProjectBuilderCandidateStableKey };

const FIRST_UNIVERSAL_PROJECT_BUILDER_CANDIDATE_SLUG = "first-universal-project-builder-candidate";

export function buildFirstUniversalProjectBuilderCandidate(input: UniversalProjectBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalProjectBuilderReview(FIRST_UNIVERSAL_PROJECT_BUILDER_CANDIDATE_SLUG, input);
}

export function buildFirstUniversalProjectBuilderCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalProjectBuilderReviewPackets(FIRST_UNIVERSAL_PROJECT_BUILDER_CANDIDATE_SLUG);
}

export function buildFirstUniversalProjectBuilderCandidateBoundary() {
  return buildUniversalProjectBuilderReviewBoundary();
}

export function summarizeFirstUniversalProjectBuilderCandidate(model: { firstUniversalProjectBuilderCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalProjectBuilderReviewForSlug(FIRST_UNIVERSAL_PROJECT_BUILDER_CANDIDATE_SLUG, model.firstUniversalProjectBuilderCandidateItems);
}

export function buildFirstUniversalProjectBuilderCandidateModel() {
  const firstUniversalProjectBuilderCandidateItems = buildFirstUniversalProjectBuilderCandidateItems();
  const firstUniversalProjectBuilderCandidateModel = buildUniversalProjectBuilderReviewModelForSlug(FIRST_UNIVERSAL_PROJECT_BUILDER_CANDIDATE_SLUG, firstUniversalProjectBuilderCandidateItems);
  return { ...firstUniversalProjectBuilderCandidateModel, firstUniversalProjectBuilderCandidateItems };
}
