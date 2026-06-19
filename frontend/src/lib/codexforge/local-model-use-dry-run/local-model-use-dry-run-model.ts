import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  LOCAL_MODEL_USE_DRY_RUN_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildLocalModelUseDryRunStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { LOCAL_MODEL_USE_DRY_RUN_LANGUAGE, buildLocalModelUseDryRunStableKey };

const LOCAL_MODEL_USE_DRY_RUN_SLUG = "local-model-use-dry-run";

export function buildLocalModelUseDryRun(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(LOCAL_MODEL_USE_DRY_RUN_SLUG, input);
}

export function buildLocalModelUseDryRunItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(LOCAL_MODEL_USE_DRY_RUN_SLUG);
}

export function buildLocalModelUseDryRunBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeLocalModelUseDryRun(model: { localModelUseDryRunItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(LOCAL_MODEL_USE_DRY_RUN_SLUG, model.localModelUseDryRunItems);
}

export function buildLocalModelUseDryRunModel() {
  const localModelUseDryRunItems = buildLocalModelUseDryRunItems();
  const localModelUseDryRunModel = buildBackendDryRunModelRouterPreviewModelForSlug(LOCAL_MODEL_USE_DRY_RUN_SLUG, localModelUseDryRunItems);
  return { ...localModelUseDryRunModel, localModelUseDryRunItems };
}

