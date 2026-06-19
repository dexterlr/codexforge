import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  OPENAI_COMPATIBLE_MODEL_USE_DRY_RUN_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildOpenAICompatibleModelUseDryRunStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { OPENAI_COMPATIBLE_MODEL_USE_DRY_RUN_LANGUAGE, buildOpenAICompatibleModelUseDryRunStableKey };

const OPENAI_COMPATIBLE_MODEL_USE_DRY_RUN_SLUG = "openai-compatible-model-use-dry-run";

export function buildOpenAICompatibleModelUseDryRun(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(OPENAI_COMPATIBLE_MODEL_USE_DRY_RUN_SLUG, input);
}

export function buildOpenAICompatibleModelUseDryRunItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(OPENAI_COMPATIBLE_MODEL_USE_DRY_RUN_SLUG);
}

export function buildOpenAICompatibleModelUseDryRunBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeOpenAICompatibleModelUseDryRun(model: { openAICompatibleModelUseDryRunItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(OPENAI_COMPATIBLE_MODEL_USE_DRY_RUN_SLUG, model.openAICompatibleModelUseDryRunItems);
}

export function buildOpenAICompatibleModelUseDryRunModel() {
  const openAICompatibleModelUseDryRunItems = buildOpenAICompatibleModelUseDryRunItems();
  const openAICompatibleModelUseDryRunModel = buildBackendDryRunModelRouterPreviewModelForSlug(OPENAI_COMPATIBLE_MODEL_USE_DRY_RUN_SLUG, openAICompatibleModelUseDryRunItems);
  return { ...openAICompatibleModelUseDryRunModel, openAICompatibleModelUseDryRunItems };
}

