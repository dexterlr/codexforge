import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FREE_MODEL_PROVIDER_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildFreeModelProviderPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { FREE_MODEL_PROVIDER_PREVIEW_LANGUAGE, buildFreeModelProviderPreviewStableKey };

const FREE_MODEL_PROVIDER_PREVIEW_SLUG = "free-model-provider-preview";

export function buildFreeModelProviderPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(FREE_MODEL_PROVIDER_PREVIEW_SLUG, input);
}

export function buildFreeModelProviderPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(FREE_MODEL_PROVIDER_PREVIEW_SLUG);
}

export function buildFreeModelProviderPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeFreeModelProviderPreview(model: { freeModelProviderPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(FREE_MODEL_PROVIDER_PREVIEW_SLUG, model.freeModelProviderPreviewItems);
}

export function buildFreeModelProviderPreviewModel() {
  const freeModelProviderPreviewItems = buildFreeModelProviderPreviewItems();
  const freeModelProviderPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(FREE_MODEL_PROVIDER_PREVIEW_SLUG, freeModelProviderPreviewItems);
  return { ...freeModelProviderPreviewModel, freeModelProviderPreviewItems };
}
