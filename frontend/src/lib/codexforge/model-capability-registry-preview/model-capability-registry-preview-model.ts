import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_CAPABILITY_REGISTRY_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelCapabilityRegistryPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_CAPABILITY_REGISTRY_PREVIEW_LANGUAGE, buildModelCapabilityRegistryPreviewStableKey };

const MODEL_CAPABILITY_REGISTRY_PREVIEW_SLUG = "model-capability-registry-preview";

export function buildModelCapabilityRegistryPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_CAPABILITY_REGISTRY_PREVIEW_SLUG, input);
}

export function buildModelCapabilityRegistryPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_CAPABILITY_REGISTRY_PREVIEW_SLUG);
}

export function buildModelCapabilityRegistryPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelCapabilityRegistryPreview(model: { modelCapabilityRegistryPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_CAPABILITY_REGISTRY_PREVIEW_SLUG, model.modelCapabilityRegistryPreviewItems);
}

export function buildModelCapabilityRegistryPreviewModel() {
  const modelCapabilityRegistryPreviewItems = buildModelCapabilityRegistryPreviewItems();
  const model = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_CAPABILITY_REGISTRY_PREVIEW_SLUG, modelCapabilityRegistryPreviewItems);
  return { ...model, modelCapabilityRegistryPreviewItems };
}
