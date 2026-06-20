import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GAME_AUTOMATION_PLAN_PREVIEW_LANGUAGE,
  buildUniversalGameBuilderReview,
  buildUniversalGameBuilderReviewBoundary,
  buildUniversalGameBuilderReviewModelForSlug,
  buildUniversalGameBuilderReviewPackets,
  buildUniversalGameBuilderReviewStableKey as buildGameAutomationPlanPreviewStableKey,
  summarizeUniversalGameBuilderReviewForSlug,
  type UniversalGameBuilderReviewPacketInput,
} from "../universal-game-builder-preview-kit";

export { GAME_AUTOMATION_PLAN_PREVIEW_LANGUAGE, buildGameAutomationPlanPreviewStableKey };

const GAME_AUTOMATION_PLAN_PREVIEW_SLUG = "game-automation-plan-preview";

export function buildGameAutomationPlanPreview(input: UniversalGameBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalGameBuilderReview(GAME_AUTOMATION_PLAN_PREVIEW_SLUG, input);
}

export function buildGameAutomationPlanPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalGameBuilderReviewPackets(GAME_AUTOMATION_PLAN_PREVIEW_SLUG);
}

export function buildGameAutomationPlanPreviewBoundary() {
  return buildUniversalGameBuilderReviewBoundary();
}

export function summarizeGameAutomationPlanPreview(model: { gameAutomationPlanPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalGameBuilderReviewForSlug(GAME_AUTOMATION_PLAN_PREVIEW_SLUG, model.gameAutomationPlanPreviewItems);
}

export function buildGameAutomationPlanPreviewModel() {
  const gameAutomationPlanPreviewItems = buildGameAutomationPlanPreviewItems();
  const gameAutomationPlanPreviewModel = buildUniversalGameBuilderReviewModelForSlug(GAME_AUTOMATION_PLAN_PREVIEW_SLUG, gameAutomationPlanPreviewItems);
  return { ...gameAutomationPlanPreviewModel, gameAutomationPlanPreviewItems };
}