import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PRO_MODEL_USE_DRY_RUN_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildProModelUseDryRunStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { PRO_MODEL_USE_DRY_RUN_LANGUAGE, buildProModelUseDryRunStableKey };

const PRO_MODEL_USE_DRY_RUN_SLUG = "pro-model-use-dry-run";

export function buildProModelUseDryRun(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(PRO_MODEL_USE_DRY_RUN_SLUG, input);
}

export function buildProModelUseDryRunItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(PRO_MODEL_USE_DRY_RUN_SLUG);
}

export function buildProModelUseDryRunBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeProModelUseDryRun(model: { proModelUseDryRunItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(PRO_MODEL_USE_DRY_RUN_SLUG, model.proModelUseDryRunItems);
}

export function buildProModelUseDryRunModel() {
  const proModelUseDryRunItems = buildProModelUseDryRunItems();
  const proModelUseDryRunModel = buildBackendDryRunModelRouterPreviewModelForSlug(PRO_MODEL_USE_DRY_RUN_SLUG, proModelUseDryRunItems);
  return { ...proModelUseDryRunModel, proModelUseDryRunItems };
}

