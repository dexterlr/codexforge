import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_UNIVERSAL_GAME_BUILDER_CANDIDATE_LANGUAGE,
  buildUniversalGameBuilderReview,
  buildUniversalGameBuilderReviewBoundary,
  buildUniversalGameBuilderReviewModelForSlug,
  buildUniversalGameBuilderReviewPackets,
  buildUniversalGameBuilderReviewStableKey as buildFirstUniversalGameBuilderCandidateStableKey,
  summarizeUniversalGameBuilderReviewForSlug,
  type UniversalGameBuilderReviewPacketInput,
} from "../universal-game-builder-preview-kit";

export { FIRST_UNIVERSAL_GAME_BUILDER_CANDIDATE_LANGUAGE, buildFirstUniversalGameBuilderCandidateStableKey };

const FIRST_UNIVERSAL_GAME_BUILDER_CANDIDATE_SLUG = "first-universal-game-builder-candidate";

export function buildFirstUniversalGameBuilderCandidate(input: UniversalGameBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalGameBuilderReview(FIRST_UNIVERSAL_GAME_BUILDER_CANDIDATE_SLUG, input);
}

export function buildFirstUniversalGameBuilderCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalGameBuilderReviewPackets(FIRST_UNIVERSAL_GAME_BUILDER_CANDIDATE_SLUG);
}

export function buildFirstUniversalGameBuilderCandidateBoundary() {
  return buildUniversalGameBuilderReviewBoundary();
}

export function summarizeFirstUniversalGameBuilderCandidate(model: { firstUniversalGameBuilderCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalGameBuilderReviewForSlug(FIRST_UNIVERSAL_GAME_BUILDER_CANDIDATE_SLUG, model.firstUniversalGameBuilderCandidateItems);
}

export function buildFirstUniversalGameBuilderCandidateModel() {
  const firstUniversalGameBuilderCandidateItems = buildFirstUniversalGameBuilderCandidateItems();
  const firstUniversalGameBuilderCandidateModel = buildUniversalGameBuilderReviewModelForSlug(FIRST_UNIVERSAL_GAME_BUILDER_CANDIDATE_SLUG, firstUniversalGameBuilderCandidateItems);
  return { ...firstUniversalGameBuilderCandidateModel, firstUniversalGameBuilderCandidateItems };
}