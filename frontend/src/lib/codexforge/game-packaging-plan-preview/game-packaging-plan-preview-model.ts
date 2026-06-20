import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GAME_PACKAGING_PLAN_PREVIEW_LANGUAGE,
  buildUniversalGameBuilderReview,
  buildUniversalGameBuilderReviewBoundary,
  buildUniversalGameBuilderReviewModelForSlug,
  buildUniversalGameBuilderReviewPackets,
  buildUniversalGameBuilderReviewStableKey as buildGamePackagingPlanPreviewStableKey,
  summarizeUniversalGameBuilderReviewForSlug,
  type UniversalGameBuilderReviewPacketInput,
} from "../universal-game-builder-preview-kit";

export { GAME_PACKAGING_PLAN_PREVIEW_LANGUAGE, buildGamePackagingPlanPreviewStableKey };

const GAME_PACKAGING_PLAN_PREVIEW_SLUG = "game-packaging-plan-preview";

export function buildGamePackagingPlanPreview(input: UniversalGameBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalGameBuilderReview(GAME_PACKAGING_PLAN_PREVIEW_SLUG, input);
}

export function buildGamePackagingPlanPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalGameBuilderReviewPackets(GAME_PACKAGING_PLAN_PREVIEW_SLUG);
}

export function buildGamePackagingPlanPreviewBoundary() {
  return buildUniversalGameBuilderReviewBoundary();
}

export function summarizeGamePackagingPlanPreview(model: { gamePackagingPlanPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalGameBuilderReviewForSlug(GAME_PACKAGING_PLAN_PREVIEW_SLUG, model.gamePackagingPlanPreviewItems);
}

export function buildGamePackagingPlanPreviewModel() {
  const gamePackagingPlanPreviewItems = buildGamePackagingPlanPreviewItems();
  const gamePackagingPlanPreviewModel = buildUniversalGameBuilderReviewModelForSlug(GAME_PACKAGING_PLAN_PREVIEW_SLUG, gamePackagingPlanPreviewItems);
  return { ...gamePackagingPlanPreviewModel, gamePackagingPlanPreviewItems };
}