import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  CONTROLLED_MODEL_USE_DRY_RUN_INVENTORY_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildControlledModelUseDryRunInventoryStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { CONTROLLED_MODEL_USE_DRY_RUN_INVENTORY_LANGUAGE, buildControlledModelUseDryRunInventoryStableKey };

const CONTROLLED_MODEL_USE_DRY_RUN_INVENTORY_SLUG = "controlled-model-use-dry-run-inventory";

export function buildControlledModelUseDryRunInventory(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(CONTROLLED_MODEL_USE_DRY_RUN_INVENTORY_SLUG, input);
}

export function buildControlledModelUseDryRunInventoryItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(CONTROLLED_MODEL_USE_DRY_RUN_INVENTORY_SLUG);
}

export function buildControlledModelUseDryRunInventoryBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeControlledModelUseDryRunInventory(model: { controlledModelUseDryRunInventoryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(CONTROLLED_MODEL_USE_DRY_RUN_INVENTORY_SLUG, model.controlledModelUseDryRunInventoryItems);
}

export function buildControlledModelUseDryRunInventoryModel() {
  const controlledModelUseDryRunInventoryItems = buildControlledModelUseDryRunInventoryItems();
  const controlledModelUseDryRunInventoryModel = buildBackendDryRunModelRouterPreviewModelForSlug(CONTROLLED_MODEL_USE_DRY_RUN_INVENTORY_SLUG, controlledModelUseDryRunInventoryItems);
  return { ...controlledModelUseDryRunInventoryModel, controlledModelUseDryRunInventoryItems };
}

