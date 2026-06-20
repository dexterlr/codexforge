import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GAME_RECOVERY_PLAN_PREVIEW_LANGUAGE,
  buildUniversalGameBuilderReview,
  buildUniversalGameBuilderReviewBoundary,
  buildUniversalGameBuilderReviewModelForSlug,
  buildUniversalGameBuilderReviewPackets,
  buildUniversalGameBuilderReviewStableKey as buildGameRecoveryPlanPreviewStableKey,
  summarizeUniversalGameBuilderReviewForSlug,
  type UniversalGameBuilderReviewPacketInput,
} from "../universal-game-builder-preview-kit";

export { GAME_RECOVERY_PLAN_PREVIEW_LANGUAGE, buildGameRecoveryPlanPreviewStableKey };

const GAME_RECOVERY_PLAN_PREVIEW_SLUG = "game-recovery-plan-preview";

export function buildGameRecoveryPlanPreview(input: UniversalGameBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalGameBuilderReview(GAME_RECOVERY_PLAN_PREVIEW_SLUG, input);
}

export function buildGameRecoveryPlanPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalGameBuilderReviewPackets(GAME_RECOVERY_PLAN_PREVIEW_SLUG);
}

export function buildGameRecoveryPlanPreviewBoundary() {
  return buildUniversalGameBuilderReviewBoundary();
}

export function summarizeGameRecoveryPlanPreview(model: { gameRecoveryPlanPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalGameBuilderReviewForSlug(GAME_RECOVERY_PLAN_PREVIEW_SLUG, model.gameRecoveryPlanPreviewItems);
}

export function buildGameRecoveryPlanPreviewModel() {
  const gameRecoveryPlanPreviewItems = buildGameRecoveryPlanPreviewItems();
  const gameRecoveryPlanPreviewModel = buildUniversalGameBuilderReviewModelForSlug(GAME_RECOVERY_PLAN_PREVIEW_SLUG, gameRecoveryPlanPreviewItems);
  return { ...gameRecoveryPlanPreviewModel, gameRecoveryPlanPreviewItems };
}