import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PAID_MODEL_CONNECTION_TEST_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildPaidModelConnectionTestPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { PAID_MODEL_CONNECTION_TEST_PREVIEW_LANGUAGE, buildPaidModelConnectionTestPreviewStableKey };

const PAID_MODEL_CONNECTION_TEST_PREVIEW_SLUG = "paid-model-connection-test-preview";

export function buildPaidModelConnectionTestPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(PAID_MODEL_CONNECTION_TEST_PREVIEW_SLUG, input);
}

export function buildPaidModelConnectionTestPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(PAID_MODEL_CONNECTION_TEST_PREVIEW_SLUG);
}

export function buildPaidModelConnectionTestPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizePaidModelConnectionTestPreview(model: { paidModelConnectionTestPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(PAID_MODEL_CONNECTION_TEST_PREVIEW_SLUG, model.paidModelConnectionTestPreviewItems);
}

export function buildPaidModelConnectionTestPreviewModel() {
  const paidModelConnectionTestPreviewItems = buildPaidModelConnectionTestPreviewItems();
  const paidModelConnectionTestPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(PAID_MODEL_CONNECTION_TEST_PREVIEW_SLUG, paidModelConnectionTestPreviewItems);
  return { ...paidModelConnectionTestPreviewModel, paidModelConnectionTestPreviewItems };
}
