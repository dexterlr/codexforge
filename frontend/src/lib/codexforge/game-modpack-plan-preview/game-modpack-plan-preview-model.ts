import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GAME_MODPACK_PLAN_PREVIEW_LANGUAGE,
  buildUniversalGameBuilderReview,
  buildUniversalGameBuilderReviewBoundary,
  buildUniversalGameBuilderReviewModelForSlug,
  buildUniversalGameBuilderReviewPackets,
  buildUniversalGameBuilderReviewStableKey as buildGameModpackPlanPreviewStableKey,
  summarizeUniversalGameBuilderReviewForSlug,
  type UniversalGameBuilderReviewPacketInput,
} from "../universal-game-builder-preview-kit";

export { GAME_MODPACK_PLAN_PREVIEW_LANGUAGE, buildGameModpackPlanPreviewStableKey };

const GAME_MODPACK_PLAN_PREVIEW_SLUG = "game-modpack-plan-preview";

export function buildGameModpackPlanPreview(input: UniversalGameBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalGameBuilderReview(GAME_MODPACK_PLAN_PREVIEW_SLUG, input);
}

export function buildGameModpackPlanPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalGameBuilderReviewPackets(GAME_MODPACK_PLAN_PREVIEW_SLUG);
}

export function buildGameModpackPlanPreviewBoundary() {
  return buildUniversalGameBuilderReviewBoundary();
}

export function summarizeGameModpackPlanPreview(model: { gameModpackPlanPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalGameBuilderReviewForSlug(GAME_MODPACK_PLAN_PREVIEW_SLUG, model.gameModpackPlanPreviewItems);
}

export function buildGameModpackPlanPreviewModel() {
  const gameModpackPlanPreviewItems = buildGameModpackPlanPreviewItems();
  const gameModpackPlanPreviewModel = buildUniversalGameBuilderReviewModelForSlug(GAME_MODPACK_PLAN_PREVIEW_SLUG, gameModpackPlanPreviewItems);
  return { ...gameModpackPlanPreviewModel, gameModpackPlanPreviewItems };
}