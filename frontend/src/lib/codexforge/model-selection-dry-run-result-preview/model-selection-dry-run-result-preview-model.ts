import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_SELECTION_DRY_RUN_RESULT_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelSelectionDryRunResultPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_SELECTION_DRY_RUN_RESULT_PREVIEW_LANGUAGE, buildModelSelectionDryRunResultPreviewStableKey };

const MODEL_SELECTION_DRY_RUN_RESULT_PREVIEW_SLUG = "model-selection-dry-run-result-preview";

export function buildModelSelectionDryRunResultPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_SELECTION_DRY_RUN_RESULT_PREVIEW_SLUG, input);
}

export function buildModelSelectionDryRunResultPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_SELECTION_DRY_RUN_RESULT_PREVIEW_SLUG);
}

export function buildModelSelectionDryRunResultPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelSelectionDryRunResultPreview(model: { modelSelectionDryRunResultPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_SELECTION_DRY_RUN_RESULT_PREVIEW_SLUG, model.modelSelectionDryRunResultPreviewItems);
}

export function buildModelSelectionDryRunResultPreviewModel() {
  const modelSelectionDryRunResultPreviewItems = buildModelSelectionDryRunResultPreviewItems();
  const modelSelectionDryRunResultPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_SELECTION_DRY_RUN_RESULT_PREVIEW_SLUG, modelSelectionDryRunResultPreviewItems);
  return { ...modelSelectionDryRunResultPreviewModel, modelSelectionDryRunResultPreviewItems };
}
