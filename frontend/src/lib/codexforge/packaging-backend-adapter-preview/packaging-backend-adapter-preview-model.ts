import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PACKAGING_BACKEND_ADAPTER_PREVIEW_LANGUAGE,
  buildBackendAdapterImplementationPreview,
  buildBackendAdapterImplementationPreviewBoundary,
  buildBackendAdapterImplementationPreviewModelForSlug,
  buildBackendAdapterImplementationPreviewPackets,
  buildBackendAdapterImplementationPreviewStableKey as buildPackagingBackendAdapterPreviewStableKey,
  summarizeBackendAdapterImplementationPreviewForSlug,
  type BackendAdapterImplementationPreviewPacketInput,
} from "../backend-adapter-implementation-preview-kit";

export { PACKAGING_BACKEND_ADAPTER_PREVIEW_LANGUAGE, buildPackagingBackendAdapterPreviewStableKey };

const PACKAGING_BACKEND_ADAPTER_PREVIEW_SLUG = "packaging-backend-adapter-preview";

export function buildPackagingBackendAdapterPreview(input: BackendAdapterImplementationPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterImplementationPreview(PACKAGING_BACKEND_ADAPTER_PREVIEW_SLUG, input);
}

export function buildPackagingBackendAdapterPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterImplementationPreviewPackets(PACKAGING_BACKEND_ADAPTER_PREVIEW_SLUG);
}

export function buildPackagingBackendAdapterPreviewBoundary() {
  return buildBackendAdapterImplementationPreviewBoundary();
}

export function summarizePackagingBackendAdapterPreview(model: { packagingBackendAdapterPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterImplementationPreviewForSlug(PACKAGING_BACKEND_ADAPTER_PREVIEW_SLUG, model.packagingBackendAdapterPreviewItems);
}

export function buildPackagingBackendAdapterPreviewModel() {
  const packagingBackendAdapterPreviewItems = buildPackagingBackendAdapterPreviewItems();
  const model = buildBackendAdapterImplementationPreviewModelForSlug(PACKAGING_BACKEND_ADAPTER_PREVIEW_SLUG, packagingBackendAdapterPreviewItems);
  return { ...model, packagingBackendAdapterPreviewItems };
}
