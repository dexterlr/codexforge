import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_ROUTED_EXECUTION_VALIDATION_REVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelRoutedExecutionValidationReviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_ROUTED_EXECUTION_VALIDATION_REVIEW_LANGUAGE, buildModelRoutedExecutionValidationReviewStableKey };

const MODEL_ROUTED_EXECUTION_VALIDATION_REVIEW_SLUG = "model-routed-execution-validation-review";

export function buildModelRoutedExecutionValidationReview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_ROUTED_EXECUTION_VALIDATION_REVIEW_SLUG, input);
}

export function buildModelRoutedExecutionValidationReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_ROUTED_EXECUTION_VALIDATION_REVIEW_SLUG);
}

export function buildModelRoutedExecutionValidationReviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelRoutedExecutionValidationReview(model: { modelRoutedExecutionValidationReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_ROUTED_EXECUTION_VALIDATION_REVIEW_SLUG, model.modelRoutedExecutionValidationReviewItems);
}

export function buildModelRoutedExecutionValidationReviewModel() {
  const modelRoutedExecutionValidationReviewItems = buildModelRoutedExecutionValidationReviewItems();
  const modelRoutedExecutionValidationReviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_ROUTED_EXECUTION_VALIDATION_REVIEW_SLUG, modelRoutedExecutionValidationReviewItems);
  return { ...modelRoutedExecutionValidationReviewModel, modelRoutedExecutionValidationReviewItems };
}
