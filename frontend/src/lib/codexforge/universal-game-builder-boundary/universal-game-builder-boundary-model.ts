import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  UNIVERSAL_GAME_BUILDER_BOUNDARY_LANGUAGE,
  buildUniversalGameBuilderReview,
  buildUniversalGameBuilderReviewBoundary,
  buildUniversalGameBuilderReviewModelForSlug,
  buildUniversalGameBuilderReviewPackets,
  buildUniversalGameBuilderReviewStableKey as buildUniversalGameBuilderBoundaryStableKey,
  summarizeUniversalGameBuilderReviewForSlug,
  type UniversalGameBuilderReviewPacketInput,
} from "../universal-game-builder-preview-kit";

export { UNIVERSAL_GAME_BUILDER_BOUNDARY_LANGUAGE, buildUniversalGameBuilderBoundaryStableKey };

const UNIVERSAL_GAME_BUILDER_BOUNDARY_SLUG = "universal-game-builder-boundary";

export function buildUniversalGameBuilderBoundary(input: UniversalGameBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalGameBuilderReview(UNIVERSAL_GAME_BUILDER_BOUNDARY_SLUG, input);
}

export function buildUniversalGameBuilderBoundaryItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalGameBuilderReviewPackets(UNIVERSAL_GAME_BUILDER_BOUNDARY_SLUG);
}

export function buildUniversalGameBuilderBoundaryBoundary() {
  return buildUniversalGameBuilderReviewBoundary();
}

export function summarizeUniversalGameBuilderBoundary(model: { universalGameBuilderBoundaryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalGameBuilderReviewForSlug(UNIVERSAL_GAME_BUILDER_BOUNDARY_SLUG, model.universalGameBuilderBoundaryItems);
}

export function buildUniversalGameBuilderBoundaryModel() {
  const universalGameBuilderBoundaryItems = buildUniversalGameBuilderBoundaryItems();
  const universalGameBuilderBoundaryModel = buildUniversalGameBuilderReviewModelForSlug(UNIVERSAL_GAME_BUILDER_BOUNDARY_SLUG, universalGameBuilderBoundaryItems);
  return { ...universalGameBuilderBoundaryModel, universalGameBuilderBoundaryItems };
}