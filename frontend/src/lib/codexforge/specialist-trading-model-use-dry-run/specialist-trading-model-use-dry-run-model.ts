import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SPECIALIST_TRADING_MODEL_USE_DRY_RUN_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildSpecialistTradingModelUseDryRunStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { SPECIALIST_TRADING_MODEL_USE_DRY_RUN_LANGUAGE, buildSpecialistTradingModelUseDryRunStableKey };

const SPECIALIST_TRADING_MODEL_USE_DRY_RUN_SLUG = "specialist-trading-model-use-dry-run";

export function buildSpecialistTradingModelUseDryRun(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(SPECIALIST_TRADING_MODEL_USE_DRY_RUN_SLUG, input);
}

export function buildSpecialistTradingModelUseDryRunItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(SPECIALIST_TRADING_MODEL_USE_DRY_RUN_SLUG);
}

export function buildSpecialistTradingModelUseDryRunBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeSpecialistTradingModelUseDryRun(model: { specialistTradingModelUseDryRunItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(SPECIALIST_TRADING_MODEL_USE_DRY_RUN_SLUG, model.specialistTradingModelUseDryRunItems);
}

export function buildSpecialistTradingModelUseDryRunModel() {
  const specialistTradingModelUseDryRunItems = buildSpecialistTradingModelUseDryRunItems();
  const specialistTradingModelUseDryRunModel = buildBackendDryRunModelRouterPreviewModelForSlug(SPECIALIST_TRADING_MODEL_USE_DRY_RUN_SLUG, specialistTradingModelUseDryRunItems);
  return { ...specialistTradingModelUseDryRunModel, specialistTradingModelUseDryRunItems };
}

