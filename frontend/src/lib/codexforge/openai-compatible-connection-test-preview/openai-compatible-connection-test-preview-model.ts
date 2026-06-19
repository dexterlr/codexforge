import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  OPENAI_COMPATIBLE_CONNECTION_TEST_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildOpenAICompatibleConnectionTestPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { OPENAI_COMPATIBLE_CONNECTION_TEST_PREVIEW_LANGUAGE, buildOpenAICompatibleConnectionTestPreviewStableKey };

const OPENAI_COMPATIBLE_CONNECTION_TEST_PREVIEW_SLUG = "openai-compatible-connection-test-preview";

export function buildOpenAICompatibleConnectionTestPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(OPENAI_COMPATIBLE_CONNECTION_TEST_PREVIEW_SLUG, input);
}

export function buildOpenAICompatibleConnectionTestPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(OPENAI_COMPATIBLE_CONNECTION_TEST_PREVIEW_SLUG);
}

export function buildOpenAICompatibleConnectionTestPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeOpenAICompatibleConnectionTestPreview(model: { openAICompatibleConnectionTestPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(OPENAI_COMPATIBLE_CONNECTION_TEST_PREVIEW_SLUG, model.openAICompatibleConnectionTestPreviewItems);
}

export function buildOpenAICompatibleConnectionTestPreviewModel() {
  const openAICompatibleConnectionTestPreviewItems = buildOpenAICompatibleConnectionTestPreviewItems();
  const openAICompatibleConnectionTestPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(OPENAI_COMPATIBLE_CONNECTION_TEST_PREVIEW_SLUG, openAICompatibleConnectionTestPreviewItems);
  return { ...openAICompatibleConnectionTestPreviewModel, openAICompatibleConnectionTestPreviewItems };
}
