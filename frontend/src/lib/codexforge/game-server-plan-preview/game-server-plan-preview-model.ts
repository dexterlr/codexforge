import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GAME_SERVER_PLAN_PREVIEW_LANGUAGE,
  buildUniversalGameBuilderReview,
  buildUniversalGameBuilderReviewBoundary,
  buildUniversalGameBuilderReviewModelForSlug,
  buildUniversalGameBuilderReviewPackets,
  buildUniversalGameBuilderReviewStableKey as buildGameServerPlanPreviewStableKey,
  summarizeUniversalGameBuilderReviewForSlug,
  type UniversalGameBuilderReviewPacketInput,
} from "../universal-game-builder-preview-kit";

export { GAME_SERVER_PLAN_PREVIEW_LANGUAGE, buildGameServerPlanPreviewStableKey };

const GAME_SERVER_PLAN_PREVIEW_SLUG = "game-server-plan-preview";

export function buildGameServerPlanPreview(input: UniversalGameBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalGameBuilderReview(GAME_SERVER_PLAN_PREVIEW_SLUG, input);
}

export function buildGameServerPlanPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalGameBuilderReviewPackets(GAME_SERVER_PLAN_PREVIEW_SLUG);
}

export function buildGameServerPlanPreviewBoundary() {
  return buildUniversalGameBuilderReviewBoundary();
}

export function summarizeGameServerPlanPreview(model: { gameServerPlanPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalGameBuilderReviewForSlug(GAME_SERVER_PLAN_PREVIEW_SLUG, model.gameServerPlanPreviewItems);
}

export function buildGameServerPlanPreviewModel() {
  const gameServerPlanPreviewItems = buildGameServerPlanPreviewItems();
  const gameServerPlanPreviewModel = buildUniversalGameBuilderReviewModelForSlug(GAME_SERVER_PLAN_PREVIEW_SLUG, gameServerPlanPreviewItems);
  return { ...gameServerPlanPreviewModel, gameServerPlanPreviewItems };
}