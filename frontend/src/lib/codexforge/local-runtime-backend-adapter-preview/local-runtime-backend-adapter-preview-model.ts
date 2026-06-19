import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  LOCAL_RUNTIME_BACKEND_ADAPTER_PREVIEW_LANGUAGE,
  buildBackendAdapterImplementationPreview,
  buildBackendAdapterImplementationPreviewBoundary,
  buildBackendAdapterImplementationPreviewModelForSlug,
  buildBackendAdapterImplementationPreviewPackets,
  buildBackendAdapterImplementationPreviewStableKey as buildLocalRuntimeBackendAdapterPreviewStableKey,
  summarizeBackendAdapterImplementationPreviewForSlug,
  type BackendAdapterImplementationPreviewPacketInput,
} from "../backend-adapter-implementation-preview-kit";

export { LOCAL_RUNTIME_BACKEND_ADAPTER_PREVIEW_LANGUAGE, buildLocalRuntimeBackendAdapterPreviewStableKey };

const LOCAL_RUNTIME_BACKEND_ADAPTER_PREVIEW_SLUG = "local-runtime-backend-adapter-preview";

export function buildLocalRuntimeBackendAdapterPreview(input: BackendAdapterImplementationPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterImplementationPreview(LOCAL_RUNTIME_BACKEND_ADAPTER_PREVIEW_SLUG, input);
}

export function buildLocalRuntimeBackendAdapterPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterImplementationPreviewPackets(LOCAL_RUNTIME_BACKEND_ADAPTER_PREVIEW_SLUG);
}

export function buildLocalRuntimeBackendAdapterPreviewBoundary() {
  return buildBackendAdapterImplementationPreviewBoundary();
}

export function summarizeLocalRuntimeBackendAdapterPreview(model: { localRuntimeBackendAdapterPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterImplementationPreviewForSlug(LOCAL_RUNTIME_BACKEND_ADAPTER_PREVIEW_SLUG, model.localRuntimeBackendAdapterPreviewItems);
}

export function buildLocalRuntimeBackendAdapterPreviewModel() {
  const localRuntimeBackendAdapterPreviewItems = buildLocalRuntimeBackendAdapterPreviewItems();
  const model = buildBackendAdapterImplementationPreviewModelForSlug(LOCAL_RUNTIME_BACKEND_ADAPTER_PREVIEW_SLUG, localRuntimeBackendAdapterPreviewItems);
  return { ...model, localRuntimeBackendAdapterPreviewItems };
}
