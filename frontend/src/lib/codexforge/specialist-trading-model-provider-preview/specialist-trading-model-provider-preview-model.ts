import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SPECIALIST_TRADING_MODEL_PROVIDER_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildSpecialistTradingModelProviderPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { SPECIALIST_TRADING_MODEL_PROVIDER_PREVIEW_LANGUAGE, buildSpecialistTradingModelProviderPreviewStableKey };

const SPECIALIST_TRADING_MODEL_PROVIDER_PREVIEW_SLUG = "specialist-trading-model-provider-preview";

export function buildSpecialistTradingModelProviderPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(SPECIALIST_TRADING_MODEL_PROVIDER_PREVIEW_SLUG, input);
}

export function buildSpecialistTradingModelProviderPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(SPECIALIST_TRADING_MODEL_PROVIDER_PREVIEW_SLUG);
}

export function buildSpecialistTradingModelProviderPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeSpecialistTradingModelProviderPreview(model: { specialistTradingModelProviderPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(SPECIALIST_TRADING_MODEL_PROVIDER_PREVIEW_SLUG, model.specialistTradingModelProviderPreviewItems);
}

export function buildSpecialistTradingModelProviderPreviewModel() {
  const specialistTradingModelProviderPreviewItems = buildSpecialistTradingModelProviderPreviewItems();
  const specialistTradingModelProviderPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(SPECIALIST_TRADING_MODEL_PROVIDER_PREVIEW_SLUG, specialistTradingModelProviderPreviewItems);
  return { ...specialistTradingModelProviderPreviewModel, specialistTradingModelProviderPreviewItems };
}
