import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  EVIDENCE_STORE_BACKEND_ADAPTER_PREVIEW_LANGUAGE,
  buildBackendAdapterImplementationPreview,
  buildBackendAdapterImplementationPreviewBoundary,
  buildBackendAdapterImplementationPreviewModelForSlug,
  buildBackendAdapterImplementationPreviewPackets,
  buildBackendAdapterImplementationPreviewStableKey as buildEvidenceStoreBackendAdapterPreviewStableKey,
  summarizeBackendAdapterImplementationPreviewForSlug,
  type BackendAdapterImplementationPreviewPacketInput,
} from "../backend-adapter-implementation-preview-kit";

export { EVIDENCE_STORE_BACKEND_ADAPTER_PREVIEW_LANGUAGE, buildEvidenceStoreBackendAdapterPreviewStableKey };

const EVIDENCE_STORE_BACKEND_ADAPTER_PREVIEW_SLUG = "evidence-store-backend-adapter-preview";

export function buildEvidenceStoreBackendAdapterPreview(input: BackendAdapterImplementationPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterImplementationPreview(EVIDENCE_STORE_BACKEND_ADAPTER_PREVIEW_SLUG, input);
}

export function buildEvidenceStoreBackendAdapterPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterImplementationPreviewPackets(EVIDENCE_STORE_BACKEND_ADAPTER_PREVIEW_SLUG);
}

export function buildEvidenceStoreBackendAdapterPreviewBoundary() {
  return buildBackendAdapterImplementationPreviewBoundary();
}

export function summarizeEvidenceStoreBackendAdapterPreview(model: { evidenceStoreBackendAdapterPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterImplementationPreviewForSlug(EVIDENCE_STORE_BACKEND_ADAPTER_PREVIEW_SLUG, model.evidenceStoreBackendAdapterPreviewItems);
}

export function buildEvidenceStoreBackendAdapterPreviewModel() {
  const evidenceStoreBackendAdapterPreviewItems = buildEvidenceStoreBackendAdapterPreviewItems();
  const model = buildBackendAdapterImplementationPreviewModelForSlug(EVIDENCE_STORE_BACKEND_ADAPTER_PREVIEW_SLUG, evidenceStoreBackendAdapterPreviewItems);
  return { ...model, evidenceStoreBackendAdapterPreviewItems };
}
