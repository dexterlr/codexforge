import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BACKEND_ADAPTER_AUDIT_PREVIEW_LANGUAGE,
  buildBackendAdapterImplementationPreview,
  buildBackendAdapterImplementationPreviewBoundary,
  buildBackendAdapterImplementationPreviewModelForSlug,
  buildBackendAdapterImplementationPreviewPackets,
  buildBackendAdapterImplementationPreviewStableKey as buildBackendAdapterAuditPreviewStableKey,
  summarizeBackendAdapterImplementationPreviewForSlug,
  type BackendAdapterImplementationPreviewPacketInput,
} from "../backend-adapter-implementation-preview-kit";

export { BACKEND_ADAPTER_AUDIT_PREVIEW_LANGUAGE, buildBackendAdapterAuditPreviewStableKey };

const BACKEND_ADAPTER_AUDIT_PREVIEW_SLUG = "backend-adapter-audit-preview";

export function buildBackendAdapterAuditPreview(input: BackendAdapterImplementationPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterImplementationPreview(BACKEND_ADAPTER_AUDIT_PREVIEW_SLUG, input);
}

export function buildBackendAdapterAuditPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterImplementationPreviewPackets(BACKEND_ADAPTER_AUDIT_PREVIEW_SLUG);
}

export function buildBackendAdapterAuditPreviewBoundary() {
  return buildBackendAdapterImplementationPreviewBoundary();
}

export function summarizeBackendAdapterAuditPreview(model: { backendAdapterAuditPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterImplementationPreviewForSlug(BACKEND_ADAPTER_AUDIT_PREVIEW_SLUG, model.backendAdapterAuditPreviewItems);
}

export function buildBackendAdapterAuditPreviewModel() {
  const backendAdapterAuditPreviewItems = buildBackendAdapterAuditPreviewItems();
  const model = buildBackendAdapterImplementationPreviewModelForSlug(BACKEND_ADAPTER_AUDIT_PREVIEW_SLUG, backendAdapterAuditPreviewItems);
  return { ...model, backendAdapterAuditPreviewItems };
}
