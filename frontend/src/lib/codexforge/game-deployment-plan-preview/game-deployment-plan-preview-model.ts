import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GAME_DEPLOYMENT_PLAN_PREVIEW_LANGUAGE,
  buildUniversalGameBuilderReview,
  buildUniversalGameBuilderReviewBoundary,
  buildUniversalGameBuilderReviewModelForSlug,
  buildUniversalGameBuilderReviewPackets,
  buildUniversalGameBuilderReviewStableKey as buildGameDeploymentPlanPreviewStableKey,
  summarizeUniversalGameBuilderReviewForSlug,
  type UniversalGameBuilderReviewPacketInput,
} from "../universal-game-builder-preview-kit";

export { GAME_DEPLOYMENT_PLAN_PREVIEW_LANGUAGE, buildGameDeploymentPlanPreviewStableKey };

const GAME_DEPLOYMENT_PLAN_PREVIEW_SLUG = "game-deployment-plan-preview";

export function buildGameDeploymentPlanPreview(input: UniversalGameBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalGameBuilderReview(GAME_DEPLOYMENT_PLAN_PREVIEW_SLUG, input);
}

export function buildGameDeploymentPlanPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalGameBuilderReviewPackets(GAME_DEPLOYMENT_PLAN_PREVIEW_SLUG);
}

export function buildGameDeploymentPlanPreviewBoundary() {
  return buildUniversalGameBuilderReviewBoundary();
}

export function summarizeGameDeploymentPlanPreview(model: { gameDeploymentPlanPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalGameBuilderReviewForSlug(GAME_DEPLOYMENT_PLAN_PREVIEW_SLUG, model.gameDeploymentPlanPreviewItems);
}

export function buildGameDeploymentPlanPreviewModel() {
  const gameDeploymentPlanPreviewItems = buildGameDeploymentPlanPreviewItems();
  const gameDeploymentPlanPreviewModel = buildUniversalGameBuilderReviewModelForSlug(GAME_DEPLOYMENT_PLAN_PREVIEW_SLUG, gameDeploymentPlanPreviewItems);
  return { ...gameDeploymentPlanPreviewModel, gameDeploymentPlanPreviewItems };
}