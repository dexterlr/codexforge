import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BACKEND_ADAPTER_DRY_RUN_PACKET_INVENTORY_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildBackendAdapterDryRunPacketInventoryStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { BACKEND_ADAPTER_DRY_RUN_PACKET_INVENTORY_LANGUAGE, buildBackendAdapterDryRunPacketInventoryStableKey };

const BACKEND_ADAPTER_DRY_RUN_PACKET_INVENTORY_SLUG = "backend-adapter-dry-run-packet-inventory";

export function buildBackendAdapterDryRunPacketInventory(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(BACKEND_ADAPTER_DRY_RUN_PACKET_INVENTORY_SLUG, input);
}

export function buildBackendAdapterDryRunPacketInventoryItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(BACKEND_ADAPTER_DRY_RUN_PACKET_INVENTORY_SLUG);
}

export function buildBackendAdapterDryRunPacketInventoryBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeBackendAdapterDryRunPacketInventory(model: { backendAdapterDryRunPacketInventoryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(BACKEND_ADAPTER_DRY_RUN_PACKET_INVENTORY_SLUG, model.backendAdapterDryRunPacketInventoryItems);
}

export function buildBackendAdapterDryRunPacketInventoryModel() {
  const backendAdapterDryRunPacketInventoryItems = buildBackendAdapterDryRunPacketInventoryItems();
  const model = buildBackendDryRunModelRouterPreviewModelForSlug(BACKEND_ADAPTER_DRY_RUN_PACKET_INVENTORY_SLUG, backendAdapterDryRunPacketInventoryItems);
  return { ...model, backendAdapterDryRunPacketInventoryItems };
}
