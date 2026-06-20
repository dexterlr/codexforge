import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GAME_SAFETY_APPROVAL_PLAN_LANGUAGE,
  buildUniversalGameBuilderReview,
  buildUniversalGameBuilderReviewBoundary,
  buildUniversalGameBuilderReviewModelForSlug,
  buildUniversalGameBuilderReviewPackets,
  buildUniversalGameBuilderReviewStableKey as buildGameSafetyApprovalPlanStableKey,
  summarizeUniversalGameBuilderReviewForSlug,
  type UniversalGameBuilderReviewPacketInput,
} from "../universal-game-builder-preview-kit";

export { GAME_SAFETY_APPROVAL_PLAN_LANGUAGE, buildGameSafetyApprovalPlanStableKey };

const GAME_SAFETY_APPROVAL_PLAN_SLUG = "game-safety-approval-plan";

export function buildGameSafetyApprovalPlan(input: UniversalGameBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalGameBuilderReview(GAME_SAFETY_APPROVAL_PLAN_SLUG, input);
}

export function buildGameSafetyApprovalPlanItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalGameBuilderReviewPackets(GAME_SAFETY_APPROVAL_PLAN_SLUG);
}

export function buildGameSafetyApprovalPlanBoundary() {
  return buildUniversalGameBuilderReviewBoundary();
}

export function summarizeGameSafetyApprovalPlan(model: { gameSafetyApprovalPlanItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalGameBuilderReviewForSlug(GAME_SAFETY_APPROVAL_PLAN_SLUG, model.gameSafetyApprovalPlanItems);
}

export function buildGameSafetyApprovalPlanModel() {
  const gameSafetyApprovalPlanItems = buildGameSafetyApprovalPlanItems();
  const gameSafetyApprovalPlanModel = buildUniversalGameBuilderReviewModelForSlug(GAME_SAFETY_APPROVAL_PLAN_SLUG, gameSafetyApprovalPlanItems);
  return { ...gameSafetyApprovalPlanModel, gameSafetyApprovalPlanItems };
}