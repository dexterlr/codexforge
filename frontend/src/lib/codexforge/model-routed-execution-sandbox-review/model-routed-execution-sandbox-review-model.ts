import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_ROUTED_EXECUTION_SANDBOX_REVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelRoutedExecutionSandboxReviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_ROUTED_EXECUTION_SANDBOX_REVIEW_LANGUAGE, buildModelRoutedExecutionSandboxReviewStableKey };

const MODEL_ROUTED_EXECUTION_SANDBOX_REVIEW_SLUG = "model-routed-execution-sandbox-review";

export function buildModelRoutedExecutionSandboxReview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_ROUTED_EXECUTION_SANDBOX_REVIEW_SLUG, input);
}

export function buildModelRoutedExecutionSandboxReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_ROUTED_EXECUTION_SANDBOX_REVIEW_SLUG);
}

export function buildModelRoutedExecutionSandboxReviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelRoutedExecutionSandboxReview(model: { modelRoutedExecutionSandboxReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_ROUTED_EXECUTION_SANDBOX_REVIEW_SLUG, model.modelRoutedExecutionSandboxReviewItems);
}

export function buildModelRoutedExecutionSandboxReviewModel() {
  const modelRoutedExecutionSandboxReviewItems = buildModelRoutedExecutionSandboxReviewItems();
  const modelRoutedExecutionSandboxReviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_ROUTED_EXECUTION_SANDBOX_REVIEW_SLUG, modelRoutedExecutionSandboxReviewItems);
  return { ...modelRoutedExecutionSandboxReviewModel, modelRoutedExecutionSandboxReviewItems };
}
