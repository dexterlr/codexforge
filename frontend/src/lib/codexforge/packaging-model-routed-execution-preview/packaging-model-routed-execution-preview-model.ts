import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PACKAGING_MODEL_ROUTED_EXECUTION_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildPackagingModelRoutedExecutionPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { PACKAGING_MODEL_ROUTED_EXECUTION_PREVIEW_LANGUAGE, buildPackagingModelRoutedExecutionPreviewStableKey };

const PACKAGING_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG = "packaging-model-routed-execution-preview";

export function buildPackagingModelRoutedExecutionPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(PACKAGING_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG, input);
}

export function buildPackagingModelRoutedExecutionPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(PACKAGING_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG);
}

export function buildPackagingModelRoutedExecutionPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizePackagingModelRoutedExecutionPreview(model: { packagingModelRoutedExecutionPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(PACKAGING_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG, model.packagingModelRoutedExecutionPreviewItems);
}

export function buildPackagingModelRoutedExecutionPreviewModel() {
  const packagingModelRoutedExecutionPreviewItems = buildPackagingModelRoutedExecutionPreviewItems();
  const packagingModelRoutedExecutionPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(PACKAGING_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG, packagingModelRoutedExecutionPreviewItems);
  return { ...packagingModelRoutedExecutionPreviewModel, packagingModelRoutedExecutionPreviewItems };
}
