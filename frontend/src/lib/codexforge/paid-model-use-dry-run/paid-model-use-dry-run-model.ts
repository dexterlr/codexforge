import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PAID_MODEL_USE_DRY_RUN_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildPaidModelUseDryRunStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { PAID_MODEL_USE_DRY_RUN_LANGUAGE, buildPaidModelUseDryRunStableKey };

const PAID_MODEL_USE_DRY_RUN_SLUG = "paid-model-use-dry-run";

export function buildPaidModelUseDryRun(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(PAID_MODEL_USE_DRY_RUN_SLUG, input);
}

export function buildPaidModelUseDryRunItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(PAID_MODEL_USE_DRY_RUN_SLUG);
}

export function buildPaidModelUseDryRunBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizePaidModelUseDryRun(model: { paidModelUseDryRunItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(PAID_MODEL_USE_DRY_RUN_SLUG, model.paidModelUseDryRunItems);
}

export function buildPaidModelUseDryRunModel() {
  const paidModelUseDryRunItems = buildPaidModelUseDryRunItems();
  const paidModelUseDryRunModel = buildBackendDryRunModelRouterPreviewModelForSlug(PAID_MODEL_USE_DRY_RUN_SLUG, paidModelUseDryRunItems);
  return { ...paidModelUseDryRunModel, paidModelUseDryRunItems };
}

