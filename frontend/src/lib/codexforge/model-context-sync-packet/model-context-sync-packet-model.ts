import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_CONTEXT_SYNC_PACKET_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelContextSyncPacketStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_CONTEXT_SYNC_PACKET_LANGUAGE, buildModelContextSyncPacketStableKey };

const MODEL_CONTEXT_SYNC_PACKET_SLUG = "model-context-sync-packet";

export function buildModelContextSyncPacket(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_CONTEXT_SYNC_PACKET_SLUG, input);
}

export function buildModelContextSyncPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_CONTEXT_SYNC_PACKET_SLUG);
}

export function buildModelContextSyncPacketBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelContextSyncPacket(model: { modelContextSyncPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_CONTEXT_SYNC_PACKET_SLUG, model.modelContextSyncPacketItems);
}

export function buildModelContextSyncPacketModel() {
  const modelContextSyncPacketItems = buildModelContextSyncPacketItems();
  const modelContextSyncPacketModel = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_CONTEXT_SYNC_PACKET_SLUG, modelContextSyncPacketItems);
  return { ...modelContextSyncPacketModel, modelContextSyncPacketItems };
}
