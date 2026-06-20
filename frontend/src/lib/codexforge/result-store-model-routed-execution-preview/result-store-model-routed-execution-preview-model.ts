import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  RESULT_STORE_MODEL_ROUTED_EXECUTION_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildResultStoreModelRoutedExecutionPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { RESULT_STORE_MODEL_ROUTED_EXECUTION_PREVIEW_LANGUAGE, buildResultStoreModelRoutedExecutionPreviewStableKey };

const RESULT_STORE_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG = "result-store-model-routed-execution-preview";

export function buildResultStoreModelRoutedExecutionPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(RESULT_STORE_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG, input);
}

export function buildResultStoreModelRoutedExecutionPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(RESULT_STORE_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG);
}

export function buildResultStoreModelRoutedExecutionPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeResultStoreModelRoutedExecutionPreview(model: { resultStoreModelRoutedExecutionPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(RESULT_STORE_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG, model.resultStoreModelRoutedExecutionPreviewItems);
}

export function buildResultStoreModelRoutedExecutionPreviewModel() {
  const resultStoreModelRoutedExecutionPreviewItems = buildResultStoreModelRoutedExecutionPreviewItems();
  const resultStoreModelRoutedExecutionPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(RESULT_STORE_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG, resultStoreModelRoutedExecutionPreviewItems);
  return { ...resultStoreModelRoutedExecutionPreviewModel, resultStoreModelRoutedExecutionPreviewItems };
}
