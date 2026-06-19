import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FILE_WRITE_BACKEND_DRY_RUN_PACKET_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildFileWriteBackendDryRunPacketStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { FILE_WRITE_BACKEND_DRY_RUN_PACKET_LANGUAGE, buildFileWriteBackendDryRunPacketStableKey };

const FILE_WRITE_BACKEND_DRY_RUN_PACKET_SLUG = "file-write-backend-dry-run-packet";

export function buildFileWriteBackendDryRunPacket(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(FILE_WRITE_BACKEND_DRY_RUN_PACKET_SLUG, input);
}

export function buildFileWriteBackendDryRunPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(FILE_WRITE_BACKEND_DRY_RUN_PACKET_SLUG);
}

export function buildFileWriteBackendDryRunPacketBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeFileWriteBackendDryRunPacket(model: { fileWriteBackendDryRunPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(FILE_WRITE_BACKEND_DRY_RUN_PACKET_SLUG, model.fileWriteBackendDryRunPacketItems);
}

export function buildFileWriteBackendDryRunPacketModel() {
  const fileWriteBackendDryRunPacketItems = buildFileWriteBackendDryRunPacketItems();
  const model = buildBackendDryRunModelRouterPreviewModelForSlug(FILE_WRITE_BACKEND_DRY_RUN_PACKET_SLUG, fileWriteBackendDryRunPacketItems);
  return { ...model, fileWriteBackendDryRunPacketItems };
}
