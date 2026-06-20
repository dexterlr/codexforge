import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GAME_CONTENT_PLAN_PREVIEW_LANGUAGE,
  buildUniversalGameBuilderReview,
  buildUniversalGameBuilderReviewBoundary,
  buildUniversalGameBuilderReviewModelForSlug,
  buildUniversalGameBuilderReviewPackets,
  buildUniversalGameBuilderReviewStableKey as buildGameContentPlanPreviewStableKey,
  summarizeUniversalGameBuilderReviewForSlug,
  type UniversalGameBuilderReviewPacketInput,
} from "../universal-game-builder-preview-kit";

export { GAME_CONTENT_PLAN_PREVIEW_LANGUAGE, buildGameContentPlanPreviewStableKey };

const GAME_CONTENT_PLAN_PREVIEW_SLUG = "game-content-plan-preview";

export function buildGameContentPlanPreview(input: UniversalGameBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalGameBuilderReview(GAME_CONTENT_PLAN_PREVIEW_SLUG, input);
}

export function buildGameContentPlanPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalGameBuilderReviewPackets(GAME_CONTENT_PLAN_PREVIEW_SLUG);
}

export function buildGameContentPlanPreviewBoundary() {
  return buildUniversalGameBuilderReviewBoundary();
}

export function summarizeGameContentPlanPreview(model: { gameContentPlanPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalGameBuilderReviewForSlug(GAME_CONTENT_PLAN_PREVIEW_SLUG, model.gameContentPlanPreviewItems);
}

export function buildGameContentPlanPreviewModel() {
  const gameContentPlanPreviewItems = buildGameContentPlanPreviewItems();
  const gameContentPlanPreviewModel = buildUniversalGameBuilderReviewModelForSlug(GAME_CONTENT_PLAN_PREVIEW_SLUG, gameContentPlanPreviewItems);
  return { ...gameContentPlanPreviewModel, gameContentPlanPreviewItems };
}