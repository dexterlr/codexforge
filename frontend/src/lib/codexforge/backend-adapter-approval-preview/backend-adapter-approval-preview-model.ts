import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BACKEND_ADAPTER_APPROVAL_PREVIEW_LANGUAGE,
  buildBackendAdapterImplementationPreview,
  buildBackendAdapterImplementationPreviewBoundary,
  buildBackendAdapterImplementationPreviewModelForSlug,
  buildBackendAdapterImplementationPreviewPackets,
  buildBackendAdapterImplementationPreviewStableKey as buildBackendAdapterApprovalPreviewStableKey,
  summarizeBackendAdapterImplementationPreviewForSlug,
  type BackendAdapterImplementationPreviewPacketInput,
} from "../backend-adapter-implementation-preview-kit";

export { BACKEND_ADAPTER_APPROVAL_PREVIEW_LANGUAGE, buildBackendAdapterApprovalPreviewStableKey };

const BACKEND_ADAPTER_APPROVAL_PREVIEW_SLUG = "backend-adapter-approval-preview";

export function buildBackendAdapterApprovalPreview(input: BackendAdapterImplementationPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterImplementationPreview(BACKEND_ADAPTER_APPROVAL_PREVIEW_SLUG, input);
}

export function buildBackendAdapterApprovalPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterImplementationPreviewPackets(BACKEND_ADAPTER_APPROVAL_PREVIEW_SLUG);
}

export function buildBackendAdapterApprovalPreviewBoundary() {
  return buildBackendAdapterImplementationPreviewBoundary();
}

export function summarizeBackendAdapterApprovalPreview(model: { backendAdapterApprovalPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterImplementationPreviewForSlug(BACKEND_ADAPTER_APPROVAL_PREVIEW_SLUG, model.backendAdapterApprovalPreviewItems);
}

export function buildBackendAdapterApprovalPreviewModel() {
  const backendAdapterApprovalPreviewItems = buildBackendAdapterApprovalPreviewItems();
  const model = buildBackendAdapterImplementationPreviewModelForSlug(BACKEND_ADAPTER_APPROVAL_PREVIEW_SLUG, backendAdapterApprovalPreviewItems);
  return { ...model, backendAdapterApprovalPreviewItems };
}
