import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  LOCAL_RUNTIME_BACKEND_DRY_RUN_PACKET_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildLocalRuntimeBackendDryRunPacketStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { LOCAL_RUNTIME_BACKEND_DRY_RUN_PACKET_LANGUAGE, buildLocalRuntimeBackendDryRunPacketStableKey };

const LOCAL_RUNTIME_BACKEND_DRY_RUN_PACKET_SLUG = "local-runtime-backend-dry-run-packet";

export function buildLocalRuntimeBackendDryRunPacket(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(LOCAL_RUNTIME_BACKEND_DRY_RUN_PACKET_SLUG, input);
}

export function buildLocalRuntimeBackendDryRunPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(LOCAL_RUNTIME_BACKEND_DRY_RUN_PACKET_SLUG);
}

export function buildLocalRuntimeBackendDryRunPacketBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeLocalRuntimeBackendDryRunPacket(model: { localRuntimeBackendDryRunPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(LOCAL_RUNTIME_BACKEND_DRY_RUN_PACKET_SLUG, model.localRuntimeBackendDryRunPacketItems);
}

export function buildLocalRuntimeBackendDryRunPacketModel() {
  const localRuntimeBackendDryRunPacketItems = buildLocalRuntimeBackendDryRunPacketItems();
  const model = buildBackendDryRunModelRouterPreviewModelForSlug(LOCAL_RUNTIME_BACKEND_DRY_RUN_PACKET_SLUG, localRuntimeBackendDryRunPacketItems);
  return { ...model, localRuntimeBackendDryRunPacketItems };
}
