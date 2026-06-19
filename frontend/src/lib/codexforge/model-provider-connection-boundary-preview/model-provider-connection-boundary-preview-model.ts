import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_PROVIDER_CONNECTION_BOUNDARY_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelProviderConnectionBoundaryPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_PROVIDER_CONNECTION_BOUNDARY_PREVIEW_LANGUAGE, buildModelProviderConnectionBoundaryPreviewStableKey };

const MODEL_PROVIDER_CONNECTION_BOUNDARY_PREVIEW_SLUG = "model-provider-connection-boundary-preview";

export function buildModelProviderConnectionBoundaryPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_PROVIDER_CONNECTION_BOUNDARY_PREVIEW_SLUG, input);
}

export function buildModelProviderConnectionBoundaryPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_PROVIDER_CONNECTION_BOUNDARY_PREVIEW_SLUG);
}

export function buildModelProviderConnectionBoundaryPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelProviderConnectionBoundaryPreview(model: { modelProviderConnectionBoundaryPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_PROVIDER_CONNECTION_BOUNDARY_PREVIEW_SLUG, model.modelProviderConnectionBoundaryPreviewItems);
}

export function buildModelProviderConnectionBoundaryPreviewModel() {
  const modelProviderConnectionBoundaryPreviewItems = buildModelProviderConnectionBoundaryPreviewItems();
  const modelProviderConnectionBoundaryPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_PROVIDER_CONNECTION_BOUNDARY_PREVIEW_SLUG, modelProviderConnectionBoundaryPreviewItems);
  return { ...modelProviderConnectionBoundaryPreviewModel, modelProviderConnectionBoundaryPreviewItems };
}
