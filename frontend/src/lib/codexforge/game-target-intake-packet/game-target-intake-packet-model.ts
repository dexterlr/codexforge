import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GAME_TARGET_INTAKE_PACKET_LANGUAGE,
  buildUniversalGameBuilderReview,
  buildUniversalGameBuilderReviewBoundary,
  buildUniversalGameBuilderReviewModelForSlug,
  buildUniversalGameBuilderReviewPackets,
  buildUniversalGameBuilderReviewStableKey as buildGameTargetIntakePacketStableKey,
  summarizeUniversalGameBuilderReviewForSlug,
  type UniversalGameBuilderReviewPacketInput,
} from "../universal-game-builder-preview-kit";

export { GAME_TARGET_INTAKE_PACKET_LANGUAGE, buildGameTargetIntakePacketStableKey };

const GAME_TARGET_INTAKE_PACKET_SLUG = "game-target-intake-packet";

export function buildGameTargetIntakePacket(input: UniversalGameBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalGameBuilderReview(GAME_TARGET_INTAKE_PACKET_SLUG, input);
}

export function buildGameTargetIntakePacketItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalGameBuilderReviewPackets(GAME_TARGET_INTAKE_PACKET_SLUG);
}

export function buildGameTargetIntakePacketBoundary() {
  return buildUniversalGameBuilderReviewBoundary();
}

export function summarizeGameTargetIntakePacket(model: { gameTargetIntakePacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalGameBuilderReviewForSlug(GAME_TARGET_INTAKE_PACKET_SLUG, model.gameTargetIntakePacketItems);
}

export function buildGameTargetIntakePacketModel() {
  const gameTargetIntakePacketItems = buildGameTargetIntakePacketItems();
  const gameTargetIntakePacketModel = buildUniversalGameBuilderReviewModelForSlug(GAME_TARGET_INTAKE_PACKET_SLUG, gameTargetIntakePacketItems);
  return { ...gameTargetIntakePacketModel, gameTargetIntakePacketItems };
}