import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  LOCAL_MODEL_PROVIDER_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildLocalModelProviderPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { LOCAL_MODEL_PROVIDER_PREVIEW_LANGUAGE, buildLocalModelProviderPreviewStableKey };

const LOCAL_MODEL_PROVIDER_PREVIEW_SLUG = "local-model-provider-preview";

export function buildLocalModelProviderPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(LOCAL_MODEL_PROVIDER_PREVIEW_SLUG, input);
}

export function buildLocalModelProviderPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(LOCAL_MODEL_PROVIDER_PREVIEW_SLUG);
}

export function buildLocalModelProviderPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeLocalModelProviderPreview(model: { localModelProviderPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(LOCAL_MODEL_PROVIDER_PREVIEW_SLUG, model.localModelProviderPreviewItems);
}

export function buildLocalModelProviderPreviewModel() {
  const localModelProviderPreviewItems = buildLocalModelProviderPreviewItems();
  const localModelProviderPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(LOCAL_MODEL_PROVIDER_PREVIEW_SLUG, localModelProviderPreviewItems);
  return { ...localModelProviderPreviewModel, localModelProviderPreviewItems };
}
