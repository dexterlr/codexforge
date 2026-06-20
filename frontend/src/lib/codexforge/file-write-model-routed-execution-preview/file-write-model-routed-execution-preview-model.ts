import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FILE_WRITE_MODEL_ROUTED_EXECUTION_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildFileWriteModelRoutedExecutionPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { FILE_WRITE_MODEL_ROUTED_EXECUTION_PREVIEW_LANGUAGE, buildFileWriteModelRoutedExecutionPreviewStableKey };

const FILE_WRITE_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG = "file-write-model-routed-execution-preview";

export function buildFileWriteModelRoutedExecutionPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(FILE_WRITE_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG, input);
}

export function buildFileWriteModelRoutedExecutionPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(FILE_WRITE_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG);
}

export function buildFileWriteModelRoutedExecutionPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeFileWriteModelRoutedExecutionPreview(model: { fileWriteModelRoutedExecutionPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(FILE_WRITE_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG, model.fileWriteModelRoutedExecutionPreviewItems);
}

export function buildFileWriteModelRoutedExecutionPreviewModel() {
  const fileWriteModelRoutedExecutionPreviewItems = buildFileWriteModelRoutedExecutionPreviewItems();
  const fileWriteModelRoutedExecutionPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(FILE_WRITE_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG, fileWriteModelRoutedExecutionPreviewItems);
  return { ...fileWriteModelRoutedExecutionPreviewModel, fileWriteModelRoutedExecutionPreviewItems };
}
