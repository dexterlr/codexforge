import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BACKEND_ADAPTER_SANDBOX_PREVIEW_LANGUAGE,
  buildBackendAdapterImplementationPreview,
  buildBackendAdapterImplementationPreviewBoundary,
  buildBackendAdapterImplementationPreviewModelForSlug,
  buildBackendAdapterImplementationPreviewPackets,
  buildBackendAdapterImplementationPreviewStableKey as buildBackendAdapterSandboxPreviewStableKey,
  summarizeBackendAdapterImplementationPreviewForSlug,
  type BackendAdapterImplementationPreviewPacketInput,
} from "../backend-adapter-implementation-preview-kit";

export { BACKEND_ADAPTER_SANDBOX_PREVIEW_LANGUAGE, buildBackendAdapterSandboxPreviewStableKey };

const BACKEND_ADAPTER_SANDBOX_PREVIEW_SLUG = "backend-adapter-sandbox-preview";

export function buildBackendAdapterSandboxPreview(input: BackendAdapterImplementationPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterImplementationPreview(BACKEND_ADAPTER_SANDBOX_PREVIEW_SLUG, input);
}

export function buildBackendAdapterSandboxPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterImplementationPreviewPackets(BACKEND_ADAPTER_SANDBOX_PREVIEW_SLUG);
}

export function buildBackendAdapterSandboxPreviewBoundary() {
  return buildBackendAdapterImplementationPreviewBoundary();
}

export function summarizeBackendAdapterSandboxPreview(model: { backendAdapterSandboxPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterImplementationPreviewForSlug(BACKEND_ADAPTER_SANDBOX_PREVIEW_SLUG, model.backendAdapterSandboxPreviewItems);
}

export function buildBackendAdapterSandboxPreviewModel() {
  const backendAdapterSandboxPreviewItems = buildBackendAdapterSandboxPreviewItems();
  const model = buildBackendAdapterImplementationPreviewModelForSlug(BACKEND_ADAPTER_SANDBOX_PREVIEW_SLUG, backendAdapterSandboxPreviewItems);
  return { ...model, backendAdapterSandboxPreviewItems };
}
