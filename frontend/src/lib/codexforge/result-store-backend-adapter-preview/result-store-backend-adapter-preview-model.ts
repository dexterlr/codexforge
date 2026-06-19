import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  RESULT_STORE_BACKEND_ADAPTER_PREVIEW_LANGUAGE,
  buildBackendAdapterImplementationPreview,
  buildBackendAdapterImplementationPreviewBoundary,
  buildBackendAdapterImplementationPreviewModelForSlug,
  buildBackendAdapterImplementationPreviewPackets,
  buildBackendAdapterImplementationPreviewStableKey as buildResultStoreBackendAdapterPreviewStableKey,
  summarizeBackendAdapterImplementationPreviewForSlug,
  type BackendAdapterImplementationPreviewPacketInput,
} from "../backend-adapter-implementation-preview-kit";

export { RESULT_STORE_BACKEND_ADAPTER_PREVIEW_LANGUAGE, buildResultStoreBackendAdapterPreviewStableKey };

const RESULT_STORE_BACKEND_ADAPTER_PREVIEW_SLUG = "result-store-backend-adapter-preview";

export function buildResultStoreBackendAdapterPreview(input: BackendAdapterImplementationPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterImplementationPreview(RESULT_STORE_BACKEND_ADAPTER_PREVIEW_SLUG, input);
}

export function buildResultStoreBackendAdapterPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterImplementationPreviewPackets(RESULT_STORE_BACKEND_ADAPTER_PREVIEW_SLUG);
}

export function buildResultStoreBackendAdapterPreviewBoundary() {
  return buildBackendAdapterImplementationPreviewBoundary();
}

export function summarizeResultStoreBackendAdapterPreview(model: { resultStoreBackendAdapterPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterImplementationPreviewForSlug(RESULT_STORE_BACKEND_ADAPTER_PREVIEW_SLUG, model.resultStoreBackendAdapterPreviewItems);
}

export function buildResultStoreBackendAdapterPreviewModel() {
  const resultStoreBackendAdapterPreviewItems = buildResultStoreBackendAdapterPreviewItems();
  const model = buildBackendAdapterImplementationPreviewModelForSlug(RESULT_STORE_BACKEND_ADAPTER_PREVIEW_SLUG, resultStoreBackendAdapterPreviewItems);
  return { ...model, resultStoreBackendAdapterPreviewItems };
}
