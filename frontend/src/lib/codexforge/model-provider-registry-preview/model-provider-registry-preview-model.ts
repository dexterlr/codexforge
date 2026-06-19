import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_PROVIDER_REGISTRY_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelProviderRegistryPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_PROVIDER_REGISTRY_PREVIEW_LANGUAGE, buildModelProviderRegistryPreviewStableKey };

const MODEL_PROVIDER_REGISTRY_PREVIEW_SLUG = "model-provider-registry-preview";

export function buildModelProviderRegistryPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_PROVIDER_REGISTRY_PREVIEW_SLUG, input);
}

export function buildModelProviderRegistryPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_PROVIDER_REGISTRY_PREVIEW_SLUG);
}

export function buildModelProviderRegistryPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelProviderRegistryPreview(model: { modelProviderRegistryPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_PROVIDER_REGISTRY_PREVIEW_SLUG, model.modelProviderRegistryPreviewItems);
}

export function buildModelProviderRegistryPreviewModel() {
  const modelProviderRegistryPreviewItems = buildModelProviderRegistryPreviewItems();
  const modelProviderRegistryPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_PROVIDER_REGISTRY_PREVIEW_SLUG, modelProviderRegistryPreviewItems);
  return { ...modelProviderRegistryPreviewModel, modelProviderRegistryPreviewItems };
}
