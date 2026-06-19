import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  CROSS_MODEL_RESULT_COMPARISON_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildCrossModelResultComparisonPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { CROSS_MODEL_RESULT_COMPARISON_PREVIEW_LANGUAGE, buildCrossModelResultComparisonPreviewStableKey };

const CROSS_MODEL_RESULT_COMPARISON_PREVIEW_SLUG = "cross-model-result-comparison-preview";

export function buildCrossModelResultComparisonPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(CROSS_MODEL_RESULT_COMPARISON_PREVIEW_SLUG, input);
}

export function buildCrossModelResultComparisonPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(CROSS_MODEL_RESULT_COMPARISON_PREVIEW_SLUG);
}

export function buildCrossModelResultComparisonPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeCrossModelResultComparisonPreview(model: { crossModelResultComparisonPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(CROSS_MODEL_RESULT_COMPARISON_PREVIEW_SLUG, model.crossModelResultComparisonPreviewItems);
}

export function buildCrossModelResultComparisonPreviewModel() {
  const crossModelResultComparisonPreviewItems = buildCrossModelResultComparisonPreviewItems();
  const crossModelResultComparisonPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(CROSS_MODEL_RESULT_COMPARISON_PREVIEW_SLUG, crossModelResultComparisonPreviewItems);
  return { ...crossModelResultComparisonPreviewModel, crossModelResultComparisonPreviewItems };
}
