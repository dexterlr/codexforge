import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GAME_RESULT_REVIEW_PLAN_LANGUAGE,
  buildUniversalGameBuilderReview,
  buildUniversalGameBuilderReviewBoundary,
  buildUniversalGameBuilderReviewModelForSlug,
  buildUniversalGameBuilderReviewPackets,
  buildUniversalGameBuilderReviewStableKey as buildGameResultReviewPlanStableKey,
  summarizeUniversalGameBuilderReviewForSlug,
  type UniversalGameBuilderReviewPacketInput,
} from "../universal-game-builder-preview-kit";

export { GAME_RESULT_REVIEW_PLAN_LANGUAGE, buildGameResultReviewPlanStableKey };

const GAME_RESULT_REVIEW_PLAN_SLUG = "game-result-review-plan";

export function buildGameResultReviewPlan(input: UniversalGameBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalGameBuilderReview(GAME_RESULT_REVIEW_PLAN_SLUG, input);
}

export function buildGameResultReviewPlanItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalGameBuilderReviewPackets(GAME_RESULT_REVIEW_PLAN_SLUG);
}

export function buildGameResultReviewPlanBoundary() {
  return buildUniversalGameBuilderReviewBoundary();
}

export function summarizeGameResultReviewPlan(model: { gameResultReviewPlanItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalGameBuilderReviewForSlug(GAME_RESULT_REVIEW_PLAN_SLUG, model.gameResultReviewPlanItems);
}

export function buildGameResultReviewPlanModel() {
  const gameResultReviewPlanItems = buildGameResultReviewPlanItems();
  const gameResultReviewPlanModel = buildUniversalGameBuilderReviewModelForSlug(GAME_RESULT_REVIEW_PLAN_SLUG, gameResultReviewPlanItems);
  return { ...gameResultReviewPlanModel, gameResultReviewPlanItems };
}