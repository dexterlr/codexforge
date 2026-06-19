import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  EVIDENCE_STORE_BACKEND_DRY_RUN_PACKET_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildEvidenceStoreBackendDryRunPacketStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { EVIDENCE_STORE_BACKEND_DRY_RUN_PACKET_LANGUAGE, buildEvidenceStoreBackendDryRunPacketStableKey };

const EVIDENCE_STORE_BACKEND_DRY_RUN_PACKET_SLUG = "evidence-store-backend-dry-run-packet";

export function buildEvidenceStoreBackendDryRunPacket(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(EVIDENCE_STORE_BACKEND_DRY_RUN_PACKET_SLUG, input);
}

export function buildEvidenceStoreBackendDryRunPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(EVIDENCE_STORE_BACKEND_DRY_RUN_PACKET_SLUG);
}

export function buildEvidenceStoreBackendDryRunPacketBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeEvidenceStoreBackendDryRunPacket(model: { evidenceStoreBackendDryRunPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(EVIDENCE_STORE_BACKEND_DRY_RUN_PACKET_SLUG, model.evidenceStoreBackendDryRunPacketItems);
}

export function buildEvidenceStoreBackendDryRunPacketModel() {
  const evidenceStoreBackendDryRunPacketItems = buildEvidenceStoreBackendDryRunPacketItems();
  const model = buildBackendDryRunModelRouterPreviewModelForSlug(EVIDENCE_STORE_BACKEND_DRY_RUN_PACKET_SLUG, evidenceStoreBackendDryRunPacketItems);
  return { ...model, evidenceStoreBackendDryRunPacketItems };
}
