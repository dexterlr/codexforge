import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GAME_PLATFORM_CLASSIFIER_PREVIEW_LANGUAGE,
  buildUniversalGameBuilderReview,
  buildUniversalGameBuilderReviewBoundary,
  buildUniversalGameBuilderReviewModelForSlug,
  buildUniversalGameBuilderReviewPackets,
  buildUniversalGameBuilderReviewStableKey as buildGamePlatformClassifierPreviewStableKey,
  summarizeUniversalGameBuilderReviewForSlug,
  type UniversalGameBuilderReviewPacketInput,
} from "../universal-game-builder-preview-kit";

export { GAME_PLATFORM_CLASSIFIER_PREVIEW_LANGUAGE, buildGamePlatformClassifierPreviewStableKey };

const GAME_PLATFORM_CLASSIFIER_PREVIEW_SLUG = "game-platform-classifier-preview";

export function buildGamePlatformClassifierPreview(input: UniversalGameBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalGameBuilderReview(GAME_PLATFORM_CLASSIFIER_PREVIEW_SLUG, input);
}

export function buildGamePlatformClassifierPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalGameBuilderReviewPackets(GAME_PLATFORM_CLASSIFIER_PREVIEW_SLUG);
}

export function buildGamePlatformClassifierPreviewBoundary() {
  return buildUniversalGameBuilderReviewBoundary();
}

export function summarizeGamePlatformClassifierPreview(model: { gamePlatformClassifierPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalGameBuilderReviewForSlug(GAME_PLATFORM_CLASSIFIER_PREVIEW_SLUG, model.gamePlatformClassifierPreviewItems);
}

export function buildGamePlatformClassifierPreviewModel() {
  const gamePlatformClassifierPreviewItems = buildGamePlatformClassifierPreviewItems();
  const gamePlatformClassifierPreviewModel = buildUniversalGameBuilderReviewModelForSlug(GAME_PLATFORM_CLASSIFIER_PREVIEW_SLUG, gamePlatformClassifierPreviewItems);
  return { ...gamePlatformClassifierPreviewModel, gamePlatformClassifierPreviewItems };
}