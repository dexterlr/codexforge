import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_LATENCY_SCORE_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelLatencyScorePreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_LATENCY_SCORE_PREVIEW_LANGUAGE, buildModelLatencyScorePreviewStableKey };

const MODEL_LATENCY_SCORE_PREVIEW_SLUG = "model-latency-score-preview";

export function buildModelLatencyScorePreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_LATENCY_SCORE_PREVIEW_SLUG, input);
}

export function buildModelLatencyScorePreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_LATENCY_SCORE_PREVIEW_SLUG);
}

export function buildModelLatencyScorePreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelLatencyScorePreview(model: { modelLatencyScorePreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_LATENCY_SCORE_PREVIEW_SLUG, model.modelLatencyScorePreviewItems);
}

export function buildModelLatencyScorePreviewModel() {
  const modelLatencyScorePreviewItems = buildModelLatencyScorePreviewItems();
  const modelLatencyScorePreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_LATENCY_SCORE_PREVIEW_SLUG, modelLatencyScorePreviewItems);
  return { ...modelLatencyScorePreviewModel, modelLatencyScorePreviewItems };
}
