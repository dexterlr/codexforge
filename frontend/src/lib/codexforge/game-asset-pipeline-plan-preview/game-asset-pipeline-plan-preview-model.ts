import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GAME_ASSET_PIPELINE_PLAN_PREVIEW_LANGUAGE,
  buildUniversalGameBuilderReview,
  buildUniversalGameBuilderReviewBoundary,
  buildUniversalGameBuilderReviewModelForSlug,
  buildUniversalGameBuilderReviewPackets,
  buildUniversalGameBuilderReviewStableKey as buildGameAssetPipelinePlanPreviewStableKey,
  summarizeUniversalGameBuilderReviewForSlug,
  type UniversalGameBuilderReviewPacketInput,
} from "../universal-game-builder-preview-kit";

export { GAME_ASSET_PIPELINE_PLAN_PREVIEW_LANGUAGE, buildGameAssetPipelinePlanPreviewStableKey };

const GAME_ASSET_PIPELINE_PLAN_PREVIEW_SLUG = "game-asset-pipeline-plan-preview";

export function buildGameAssetPipelinePlanPreview(input: UniversalGameBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalGameBuilderReview(GAME_ASSET_PIPELINE_PLAN_PREVIEW_SLUG, input);
}

export function buildGameAssetPipelinePlanPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalGameBuilderReviewPackets(GAME_ASSET_PIPELINE_PLAN_PREVIEW_SLUG);
}

export function buildGameAssetPipelinePlanPreviewBoundary() {
  return buildUniversalGameBuilderReviewBoundary();
}

export function summarizeGameAssetPipelinePlanPreview(model: { gameAssetPipelinePlanPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalGameBuilderReviewForSlug(GAME_ASSET_PIPELINE_PLAN_PREVIEW_SLUG, model.gameAssetPipelinePlanPreviewItems);
}

export function buildGameAssetPipelinePlanPreviewModel() {
  const gameAssetPipelinePlanPreviewItems = buildGameAssetPipelinePlanPreviewItems();
  const gameAssetPipelinePlanPreviewModel = buildUniversalGameBuilderReviewModelForSlug(GAME_ASSET_PIPELINE_PLAN_PREVIEW_SLUG, gameAssetPipelinePlanPreviewItems);
  return { ...gameAssetPipelinePlanPreviewModel, gameAssetPipelinePlanPreviewItems };
}