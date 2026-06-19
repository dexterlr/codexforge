import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PACKAGING_BACKEND_DRY_RUN_PACKET_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildPackagingBackendDryRunPacketStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { PACKAGING_BACKEND_DRY_RUN_PACKET_LANGUAGE, buildPackagingBackendDryRunPacketStableKey };

const PACKAGING_BACKEND_DRY_RUN_PACKET_SLUG = "packaging-backend-dry-run-packet";

export function buildPackagingBackendDryRunPacket(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(PACKAGING_BACKEND_DRY_RUN_PACKET_SLUG, input);
}

export function buildPackagingBackendDryRunPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(PACKAGING_BACKEND_DRY_RUN_PACKET_SLUG);
}

export function buildPackagingBackendDryRunPacketBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizePackagingBackendDryRunPacket(model: { packagingBackendDryRunPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(PACKAGING_BACKEND_DRY_RUN_PACKET_SLUG, model.packagingBackendDryRunPacketItems);
}

export function buildPackagingBackendDryRunPacketModel() {
  const packagingBackendDryRunPacketItems = buildPackagingBackendDryRunPacketItems();
  const model = buildBackendDryRunModelRouterPreviewModelForSlug(PACKAGING_BACKEND_DRY_RUN_PACKET_SLUG, packagingBackendDryRunPacketItems);
  return { ...model, packagingBackendDryRunPacketItems };
}
