import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  LOCAL_MODEL_CONNECTION_TEST_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildLocalModelConnectionTestPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { LOCAL_MODEL_CONNECTION_TEST_PREVIEW_LANGUAGE, buildLocalModelConnectionTestPreviewStableKey };

const LOCAL_MODEL_CONNECTION_TEST_PREVIEW_SLUG = "local-model-connection-test-preview";

export function buildLocalModelConnectionTestPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(LOCAL_MODEL_CONNECTION_TEST_PREVIEW_SLUG, input);
}

export function buildLocalModelConnectionTestPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(LOCAL_MODEL_CONNECTION_TEST_PREVIEW_SLUG);
}

export function buildLocalModelConnectionTestPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeLocalModelConnectionTestPreview(model: { localModelConnectionTestPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(LOCAL_MODEL_CONNECTION_TEST_PREVIEW_SLUG, model.localModelConnectionTestPreviewItems);
}

export function buildLocalModelConnectionTestPreviewModel() {
  const localModelConnectionTestPreviewItems = buildLocalModelConnectionTestPreviewItems();
  const localModelConnectionTestPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(LOCAL_MODEL_CONNECTION_TEST_PREVIEW_SLUG, localModelConnectionTestPreviewItems);
  return { ...localModelConnectionTestPreviewModel, localModelConnectionTestPreviewItems };
}
