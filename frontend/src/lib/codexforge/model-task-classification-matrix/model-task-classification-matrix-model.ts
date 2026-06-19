import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_TASK_CLASSIFICATION_MATRIX_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelTaskClassificationMatrixStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_TASK_CLASSIFICATION_MATRIX_LANGUAGE, buildModelTaskClassificationMatrixStableKey };

const MODEL_TASK_CLASSIFICATION_MATRIX_SLUG = "model-task-classification-matrix";

export function buildModelTaskClassificationMatrix(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_TASK_CLASSIFICATION_MATRIX_SLUG, input);
}

export function buildModelTaskClassificationMatrixItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_TASK_CLASSIFICATION_MATRIX_SLUG);
}

export function buildModelTaskClassificationMatrixBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelTaskClassificationMatrix(model: { modelTaskClassificationMatrixItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_TASK_CLASSIFICATION_MATRIX_SLUG, model.modelTaskClassificationMatrixItems);
}

export function buildModelTaskClassificationMatrixModel() {
  const modelTaskClassificationMatrixItems = buildModelTaskClassificationMatrixItems();
  const modelTaskClassificationMatrixModel = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_TASK_CLASSIFICATION_MATRIX_SLUG, modelTaskClassificationMatrixItems);
  return { ...modelTaskClassificationMatrixModel, modelTaskClassificationMatrixItems };
}
