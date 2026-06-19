import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_FALLBACK_CHAIN_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelFallbackChainPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_FALLBACK_CHAIN_PREVIEW_LANGUAGE, buildModelFallbackChainPreviewStableKey };

const MODEL_FALLBACK_CHAIN_PREVIEW_SLUG = "model-fallback-chain-preview";

export function buildModelFallbackChainPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_FALLBACK_CHAIN_PREVIEW_SLUG, input);
}

export function buildModelFallbackChainPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_FALLBACK_CHAIN_PREVIEW_SLUG);
}

export function buildModelFallbackChainPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelFallbackChainPreview(model: { modelFallbackChainPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_FALLBACK_CHAIN_PREVIEW_SLUG, model.modelFallbackChainPreviewItems);
}

export function buildModelFallbackChainPreviewModel() {
  const modelFallbackChainPreviewItems = buildModelFallbackChainPreviewItems();
  const model = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_FALLBACK_CHAIN_PREVIEW_SLUG, modelFallbackChainPreviewItems);
  return { ...model, modelFallbackChainPreviewItems };
}
