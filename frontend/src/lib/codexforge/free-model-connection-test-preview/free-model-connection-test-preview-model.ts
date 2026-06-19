import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FREE_MODEL_CONNECTION_TEST_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildFreeModelConnectionTestPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { FREE_MODEL_CONNECTION_TEST_PREVIEW_LANGUAGE, buildFreeModelConnectionTestPreviewStableKey };

const FREE_MODEL_CONNECTION_TEST_PREVIEW_SLUG = "free-model-connection-test-preview";

export function buildFreeModelConnectionTestPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(FREE_MODEL_CONNECTION_TEST_PREVIEW_SLUG, input);
}

export function buildFreeModelConnectionTestPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(FREE_MODEL_CONNECTION_TEST_PREVIEW_SLUG);
}

export function buildFreeModelConnectionTestPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeFreeModelConnectionTestPreview(model: { freeModelConnectionTestPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(FREE_MODEL_CONNECTION_TEST_PREVIEW_SLUG, model.freeModelConnectionTestPreviewItems);
}

export function buildFreeModelConnectionTestPreviewModel() {
  const freeModelConnectionTestPreviewItems = buildFreeModelConnectionTestPreviewItems();
  const freeModelConnectionTestPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(FREE_MODEL_CONNECTION_TEST_PREVIEW_SLUG, freeModelConnectionTestPreviewItems);
  return { ...freeModelConnectionTestPreviewModel, freeModelConnectionTestPreviewItems };
}
