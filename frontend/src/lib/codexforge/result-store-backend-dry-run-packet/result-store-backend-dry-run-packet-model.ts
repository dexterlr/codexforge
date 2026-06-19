import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  RESULT_STORE_BACKEND_DRY_RUN_PACKET_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildResultStoreBackendDryRunPacketStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { RESULT_STORE_BACKEND_DRY_RUN_PACKET_LANGUAGE, buildResultStoreBackendDryRunPacketStableKey };

const RESULT_STORE_BACKEND_DRY_RUN_PACKET_SLUG = "result-store-backend-dry-run-packet";

export function buildResultStoreBackendDryRunPacket(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(RESULT_STORE_BACKEND_DRY_RUN_PACKET_SLUG, input);
}

export function buildResultStoreBackendDryRunPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(RESULT_STORE_BACKEND_DRY_RUN_PACKET_SLUG);
}

export function buildResultStoreBackendDryRunPacketBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeResultStoreBackendDryRunPacket(model: { resultStoreBackendDryRunPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(RESULT_STORE_BACKEND_DRY_RUN_PACKET_SLUG, model.resultStoreBackendDryRunPacketItems);
}

export function buildResultStoreBackendDryRunPacketModel() {
  const resultStoreBackendDryRunPacketItems = buildResultStoreBackendDryRunPacketItems();
  const model = buildBackendDryRunModelRouterPreviewModelForSlug(RESULT_STORE_BACKEND_DRY_RUN_PACKET_SLUG, resultStoreBackendDryRunPacketItems);
  return { ...model, resultStoreBackendDryRunPacketItems };
}
