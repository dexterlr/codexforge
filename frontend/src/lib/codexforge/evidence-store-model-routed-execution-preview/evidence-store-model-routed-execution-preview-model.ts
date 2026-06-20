import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  EVIDENCE_STORE_MODEL_ROUTED_EXECUTION_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildEvidenceStoreModelRoutedExecutionPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { EVIDENCE_STORE_MODEL_ROUTED_EXECUTION_PREVIEW_LANGUAGE, buildEvidenceStoreModelRoutedExecutionPreviewStableKey };

const EVIDENCE_STORE_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG = "evidence-store-model-routed-execution-preview";

export function buildEvidenceStoreModelRoutedExecutionPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(EVIDENCE_STORE_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG, input);
}

export function buildEvidenceStoreModelRoutedExecutionPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(EVIDENCE_STORE_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG);
}

export function buildEvidenceStoreModelRoutedExecutionPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeEvidenceStoreModelRoutedExecutionPreview(model: { evidenceStoreModelRoutedExecutionPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(EVIDENCE_STORE_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG, model.evidenceStoreModelRoutedExecutionPreviewItems);
}

export function buildEvidenceStoreModelRoutedExecutionPreviewModel() {
  const evidenceStoreModelRoutedExecutionPreviewItems = buildEvidenceStoreModelRoutedExecutionPreviewItems();
  const evidenceStoreModelRoutedExecutionPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(EVIDENCE_STORE_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG, evidenceStoreModelRoutedExecutionPreviewItems);
  return { ...evidenceStoreModelRoutedExecutionPreviewModel, evidenceStoreModelRoutedExecutionPreviewItems };
}
