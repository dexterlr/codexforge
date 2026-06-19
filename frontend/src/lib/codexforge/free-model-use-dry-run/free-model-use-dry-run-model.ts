import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FREE_MODEL_USE_DRY_RUN_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildFreeModelUseDryRunStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { FREE_MODEL_USE_DRY_RUN_LANGUAGE, buildFreeModelUseDryRunStableKey };

const FREE_MODEL_USE_DRY_RUN_SLUG = "free-model-use-dry-run";

export function buildFreeModelUseDryRun(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(FREE_MODEL_USE_DRY_RUN_SLUG, input);
}

export function buildFreeModelUseDryRunItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(FREE_MODEL_USE_DRY_RUN_SLUG);
}

export function buildFreeModelUseDryRunBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeFreeModelUseDryRun(model: { freeModelUseDryRunItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(FREE_MODEL_USE_DRY_RUN_SLUG, model.freeModelUseDryRunItems);
}

export function buildFreeModelUseDryRunModel() {
  const freeModelUseDryRunItems = buildFreeModelUseDryRunItems();
  const freeModelUseDryRunModel = buildBackendDryRunModelRouterPreviewModelForSlug(FREE_MODEL_USE_DRY_RUN_SLUG, freeModelUseDryRunItems);
  return { ...freeModelUseDryRunModel, freeModelUseDryRunItems };
}

