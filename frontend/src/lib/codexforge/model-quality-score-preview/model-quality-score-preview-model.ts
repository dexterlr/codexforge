import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_QUALITY_SCORE_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelQualityScorePreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_QUALITY_SCORE_PREVIEW_LANGUAGE, buildModelQualityScorePreviewStableKey };

const MODEL_QUALITY_SCORE_PREVIEW_SLUG = "model-quality-score-preview";

export function buildModelQualityScorePreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_QUALITY_SCORE_PREVIEW_SLUG, input);
}

export function buildModelQualityScorePreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_QUALITY_SCORE_PREVIEW_SLUG);
}

export function buildModelQualityScorePreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelQualityScorePreview(model: { modelQualityScorePreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_QUALITY_SCORE_PREVIEW_SLUG, model.modelQualityScorePreviewItems);
}

export function buildModelQualityScorePreviewModel() {
  const modelQualityScorePreviewItems = buildModelQualityScorePreviewItems();
  const modelQualityScorePreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_QUALITY_SCORE_PREVIEW_SLUG, modelQualityScorePreviewItems);
  return { ...modelQualityScorePreviewModel, modelQualityScorePreviewItems };
}
