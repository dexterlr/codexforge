import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_ROUTER_SELECTION_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelRouterSelectionPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_ROUTER_SELECTION_PREVIEW_LANGUAGE, buildModelRouterSelectionPreviewStableKey };

const MODEL_ROUTER_SELECTION_PREVIEW_SLUG = "model-router-selection-preview";

export function buildModelRouterSelectionPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_ROUTER_SELECTION_PREVIEW_SLUG, input);
}

export function buildModelRouterSelectionPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_ROUTER_SELECTION_PREVIEW_SLUG);
}

export function buildModelRouterSelectionPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelRouterSelectionPreview(model: { modelRouterSelectionPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_ROUTER_SELECTION_PREVIEW_SLUG, model.modelRouterSelectionPreviewItems);
}

export function buildModelRouterSelectionPreviewModel() {
  const modelRouterSelectionPreviewItems = buildModelRouterSelectionPreviewItems();
  const model = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_ROUTER_SELECTION_PREVIEW_SLUG, modelRouterSelectionPreviewItems);
  return { ...model, modelRouterSelectionPreviewItems };
}
