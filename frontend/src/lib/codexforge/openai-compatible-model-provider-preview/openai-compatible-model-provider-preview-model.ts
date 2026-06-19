import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  OPENAI_COMPATIBLE_MODEL_PROVIDER_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildOpenAICompatibleModelProviderPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { OPENAI_COMPATIBLE_MODEL_PROVIDER_PREVIEW_LANGUAGE, buildOpenAICompatibleModelProviderPreviewStableKey };

const OPENAI_COMPATIBLE_MODEL_PROVIDER_PREVIEW_SLUG = "openai-compatible-model-provider-preview";

export function buildOpenAICompatibleModelProviderPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(OPENAI_COMPATIBLE_MODEL_PROVIDER_PREVIEW_SLUG, input);
}

export function buildOpenAICompatibleModelProviderPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(OPENAI_COMPATIBLE_MODEL_PROVIDER_PREVIEW_SLUG);
}

export function buildOpenAICompatibleModelProviderPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeOpenAICompatibleModelProviderPreview(model: { openAICompatibleModelProviderPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(OPENAI_COMPATIBLE_MODEL_PROVIDER_PREVIEW_SLUG, model.openAICompatibleModelProviderPreviewItems);
}

export function buildOpenAICompatibleModelProviderPreviewModel() {
  const openAICompatibleModelProviderPreviewItems = buildOpenAICompatibleModelProviderPreviewItems();
  const openAICompatibleModelProviderPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(OPENAI_COMPATIBLE_MODEL_PROVIDER_PREVIEW_SLUG, openAICompatibleModelProviderPreviewItems);
  return { ...openAICompatibleModelProviderPreviewModel, openAICompatibleModelProviderPreviewItems };
}
