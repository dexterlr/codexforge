import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  CROSS_MODEL_FAILURE_RECOVERY_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildCrossModelFailureRecoveryPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { CROSS_MODEL_FAILURE_RECOVERY_PREVIEW_LANGUAGE, buildCrossModelFailureRecoveryPreviewStableKey };

const CROSS_MODEL_FAILURE_RECOVERY_PREVIEW_SLUG = "cross-model-failure-recovery-preview";

export function buildCrossModelFailureRecoveryPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(CROSS_MODEL_FAILURE_RECOVERY_PREVIEW_SLUG, input);
}

export function buildCrossModelFailureRecoveryPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(CROSS_MODEL_FAILURE_RECOVERY_PREVIEW_SLUG);
}

export function buildCrossModelFailureRecoveryPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeCrossModelFailureRecoveryPreview(model: { crossModelFailureRecoveryPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(CROSS_MODEL_FAILURE_RECOVERY_PREVIEW_SLUG, model.crossModelFailureRecoveryPreviewItems);
}

export function buildCrossModelFailureRecoveryPreviewModel() {
  const crossModelFailureRecoveryPreviewItems = buildCrossModelFailureRecoveryPreviewItems();
  const crossModelFailureRecoveryPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(CROSS_MODEL_FAILURE_RECOVERY_PREVIEW_SLUG, crossModelFailureRecoveryPreviewItems);
  return { ...crossModelFailureRecoveryPreviewModel, crossModelFailureRecoveryPreviewItems };
}
