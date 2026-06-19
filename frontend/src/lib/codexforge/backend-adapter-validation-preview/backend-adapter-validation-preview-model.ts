import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BACKEND_ADAPTER_VALIDATION_PREVIEW_LANGUAGE,
  buildBackendAdapterImplementationPreview,
  buildBackendAdapterImplementationPreviewBoundary,
  buildBackendAdapterImplementationPreviewModelForSlug,
  buildBackendAdapterImplementationPreviewPackets,
  buildBackendAdapterImplementationPreviewStableKey as buildBackendAdapterValidationPreviewStableKey,
  summarizeBackendAdapterImplementationPreviewForSlug,
  type BackendAdapterImplementationPreviewPacketInput,
} from "../backend-adapter-implementation-preview-kit";

export { BACKEND_ADAPTER_VALIDATION_PREVIEW_LANGUAGE, buildBackendAdapterValidationPreviewStableKey };

const BACKEND_ADAPTER_VALIDATION_PREVIEW_SLUG = "backend-adapter-validation-preview";

export function buildBackendAdapterValidationPreview(input: BackendAdapterImplementationPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterImplementationPreview(BACKEND_ADAPTER_VALIDATION_PREVIEW_SLUG, input);
}

export function buildBackendAdapterValidationPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterImplementationPreviewPackets(BACKEND_ADAPTER_VALIDATION_PREVIEW_SLUG);
}

export function buildBackendAdapterValidationPreviewBoundary() {
  return buildBackendAdapterImplementationPreviewBoundary();
}

export function summarizeBackendAdapterValidationPreview(model: { backendAdapterValidationPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterImplementationPreviewForSlug(BACKEND_ADAPTER_VALIDATION_PREVIEW_SLUG, model.backendAdapterValidationPreviewItems);
}

export function buildBackendAdapterValidationPreviewModel() {
  const backendAdapterValidationPreviewItems = buildBackendAdapterValidationPreviewItems();
  const model = buildBackendAdapterImplementationPreviewModelForSlug(BACKEND_ADAPTER_VALIDATION_PREVIEW_SLUG, backendAdapterValidationPreviewItems);
  return { ...model, backendAdapterValidationPreviewItems };
}
