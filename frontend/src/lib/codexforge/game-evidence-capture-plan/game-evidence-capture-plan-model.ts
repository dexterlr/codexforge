import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GAME_EVIDENCE_CAPTURE_PLAN_LANGUAGE,
  buildUniversalGameBuilderReview,
  buildUniversalGameBuilderReviewBoundary,
  buildUniversalGameBuilderReviewModelForSlug,
  buildUniversalGameBuilderReviewPackets,
  buildUniversalGameBuilderReviewStableKey as buildGameEvidenceCapturePlanStableKey,
  summarizeUniversalGameBuilderReviewForSlug,
  type UniversalGameBuilderReviewPacketInput,
} from "../universal-game-builder-preview-kit";

export { GAME_EVIDENCE_CAPTURE_PLAN_LANGUAGE, buildGameEvidenceCapturePlanStableKey };

const GAME_EVIDENCE_CAPTURE_PLAN_SLUG = "game-evidence-capture-plan";

export function buildGameEvidenceCapturePlan(input: UniversalGameBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalGameBuilderReview(GAME_EVIDENCE_CAPTURE_PLAN_SLUG, input);
}

export function buildGameEvidenceCapturePlanItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalGameBuilderReviewPackets(GAME_EVIDENCE_CAPTURE_PLAN_SLUG);
}

export function buildGameEvidenceCapturePlanBoundary() {
  return buildUniversalGameBuilderReviewBoundary();
}

export function summarizeGameEvidenceCapturePlan(model: { gameEvidenceCapturePlanItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalGameBuilderReviewForSlug(GAME_EVIDENCE_CAPTURE_PLAN_SLUG, model.gameEvidenceCapturePlanItems);
}

export function buildGameEvidenceCapturePlanModel() {
  const gameEvidenceCapturePlanItems = buildGameEvidenceCapturePlanItems();
  const gameEvidenceCapturePlanModel = buildUniversalGameBuilderReviewModelForSlug(GAME_EVIDENCE_CAPTURE_PLAN_SLUG, gameEvidenceCapturePlanItems);
  return { ...gameEvidenceCapturePlanModel, gameEvidenceCapturePlanItems };
}