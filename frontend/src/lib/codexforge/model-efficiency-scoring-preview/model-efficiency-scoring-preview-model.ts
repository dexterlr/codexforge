import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_EFFICIENCY_SCORING_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelEfficiencyScoringPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_EFFICIENCY_SCORING_PREVIEW_LANGUAGE, buildModelEfficiencyScoringPreviewStableKey };

const MODEL_EFFICIENCY_SCORING_PREVIEW_SLUG = "model-efficiency-scoring-preview";

export function buildModelEfficiencyScoringPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_EFFICIENCY_SCORING_PREVIEW_SLUG, input);
}

export function buildModelEfficiencyScoringPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_EFFICIENCY_SCORING_PREVIEW_SLUG);
}

export function buildModelEfficiencyScoringPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelEfficiencyScoringPreview(model: { modelEfficiencyScoringPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_EFFICIENCY_SCORING_PREVIEW_SLUG, model.modelEfficiencyScoringPreviewItems);
}

export function buildModelEfficiencyScoringPreviewModel() {
  const modelEfficiencyScoringPreviewItems = buildModelEfficiencyScoringPreviewItems();
  const modelEfficiencyScoringPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_EFFICIENCY_SCORING_PREVIEW_SLUG, modelEfficiencyScoringPreviewItems);
  return { ...modelEfficiencyScoringPreviewModel, modelEfficiencyScoringPreviewItems };
}
