import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FILE_WRITE_BACKEND_ADAPTER_PREVIEW_LANGUAGE,
  buildBackendAdapterImplementationPreview,
  buildBackendAdapterImplementationPreviewBoundary,
  buildBackendAdapterImplementationPreviewModelForSlug,
  buildBackendAdapterImplementationPreviewPackets,
  buildBackendAdapterImplementationPreviewStableKey as buildFileWriteBackendAdapterPreviewStableKey,
  summarizeBackendAdapterImplementationPreviewForSlug,
  type BackendAdapterImplementationPreviewPacketInput,
} from "../backend-adapter-implementation-preview-kit";

export { FILE_WRITE_BACKEND_ADAPTER_PREVIEW_LANGUAGE, buildFileWriteBackendAdapterPreviewStableKey };

const FILE_WRITE_BACKEND_ADAPTER_PREVIEW_SLUG = "file-write-backend-adapter-preview";

export function buildFileWriteBackendAdapterPreview(input: BackendAdapterImplementationPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterImplementationPreview(FILE_WRITE_BACKEND_ADAPTER_PREVIEW_SLUG, input);
}

export function buildFileWriteBackendAdapterPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterImplementationPreviewPackets(FILE_WRITE_BACKEND_ADAPTER_PREVIEW_SLUG);
}

export function buildFileWriteBackendAdapterPreviewBoundary() {
  return buildBackendAdapterImplementationPreviewBoundary();
}

export function summarizeFileWriteBackendAdapterPreview(model: { fileWriteBackendAdapterPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterImplementationPreviewForSlug(FILE_WRITE_BACKEND_ADAPTER_PREVIEW_SLUG, model.fileWriteBackendAdapterPreviewItems);
}

export function buildFileWriteBackendAdapterPreviewModel() {
  const fileWriteBackendAdapterPreviewItems = buildFileWriteBackendAdapterPreviewItems();
  const model = buildBackendAdapterImplementationPreviewModelForSlug(FILE_WRITE_BACKEND_ADAPTER_PREVIEW_SLUG, fileWriteBackendAdapterPreviewItems);
  return { ...model, fileWriteBackendAdapterPreviewItems };
}
