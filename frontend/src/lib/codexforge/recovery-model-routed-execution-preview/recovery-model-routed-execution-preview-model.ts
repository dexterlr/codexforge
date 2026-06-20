import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  RECOVERY_MODEL_ROUTED_EXECUTION_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildRecoveryModelRoutedExecutionPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { RECOVERY_MODEL_ROUTED_EXECUTION_PREVIEW_LANGUAGE, buildRecoveryModelRoutedExecutionPreviewStableKey };

const RECOVERY_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG = "recovery-model-routed-execution-preview";

export function buildRecoveryModelRoutedExecutionPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(RECOVERY_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG, input);
}

export function buildRecoveryModelRoutedExecutionPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(RECOVERY_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG);
}

export function buildRecoveryModelRoutedExecutionPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeRecoveryModelRoutedExecutionPreview(model: { recoveryModelRoutedExecutionPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(RECOVERY_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG, model.recoveryModelRoutedExecutionPreviewItems);
}

export function buildRecoveryModelRoutedExecutionPreviewModel() {
  const recoveryModelRoutedExecutionPreviewItems = buildRecoveryModelRoutedExecutionPreviewItems();
  const recoveryModelRoutedExecutionPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(RECOVERY_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG, recoveryModelRoutedExecutionPreviewItems);
  return { ...recoveryModelRoutedExecutionPreviewModel, recoveryModelRoutedExecutionPreviewItems };
}
