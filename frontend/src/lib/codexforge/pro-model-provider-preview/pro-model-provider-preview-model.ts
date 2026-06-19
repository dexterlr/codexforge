import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PRO_MODEL_PROVIDER_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildProModelProviderPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { PRO_MODEL_PROVIDER_PREVIEW_LANGUAGE, buildProModelProviderPreviewStableKey };

const PRO_MODEL_PROVIDER_PREVIEW_SLUG = "pro-model-provider-preview";

export function buildProModelProviderPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(PRO_MODEL_PROVIDER_PREVIEW_SLUG, input);
}

export function buildProModelProviderPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(PRO_MODEL_PROVIDER_PREVIEW_SLUG);
}

export function buildProModelProviderPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeProModelProviderPreview(model: { proModelProviderPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(PRO_MODEL_PROVIDER_PREVIEW_SLUG, model.proModelProviderPreviewItems);
}

export function buildProModelProviderPreviewModel() {
  const proModelProviderPreviewItems = buildProModelProviderPreviewItems();
  const proModelProviderPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(PRO_MODEL_PROVIDER_PREVIEW_SLUG, proModelProviderPreviewItems);
  return { ...proModelProviderPreviewModel, proModelProviderPreviewItems };
}
