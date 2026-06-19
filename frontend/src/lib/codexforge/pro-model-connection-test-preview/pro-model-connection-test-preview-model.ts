import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PRO_MODEL_CONNECTION_TEST_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildProModelConnectionTestPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { PRO_MODEL_CONNECTION_TEST_PREVIEW_LANGUAGE, buildProModelConnectionTestPreviewStableKey };

const PRO_MODEL_CONNECTION_TEST_PREVIEW_SLUG = "pro-model-connection-test-preview";

export function buildProModelConnectionTestPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(PRO_MODEL_CONNECTION_TEST_PREVIEW_SLUG, input);
}

export function buildProModelConnectionTestPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(PRO_MODEL_CONNECTION_TEST_PREVIEW_SLUG);
}

export function buildProModelConnectionTestPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeProModelConnectionTestPreview(model: { proModelConnectionTestPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(PRO_MODEL_CONNECTION_TEST_PREVIEW_SLUG, model.proModelConnectionTestPreviewItems);
}

export function buildProModelConnectionTestPreviewModel() {
  const proModelConnectionTestPreviewItems = buildProModelConnectionTestPreviewItems();
  const proModelConnectionTestPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(PRO_MODEL_CONNECTION_TEST_PREVIEW_SLUG, proModelConnectionTestPreviewItems);
  return { ...proModelConnectionTestPreviewModel, proModelConnectionTestPreviewItems };
}
