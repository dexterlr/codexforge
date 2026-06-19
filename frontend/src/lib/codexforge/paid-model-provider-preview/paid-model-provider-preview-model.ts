import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PAID_MODEL_PROVIDER_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildPaidModelProviderPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { PAID_MODEL_PROVIDER_PREVIEW_LANGUAGE, buildPaidModelProviderPreviewStableKey };

const PAID_MODEL_PROVIDER_PREVIEW_SLUG = "paid-model-provider-preview";

export function buildPaidModelProviderPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(PAID_MODEL_PROVIDER_PREVIEW_SLUG, input);
}

export function buildPaidModelProviderPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(PAID_MODEL_PROVIDER_PREVIEW_SLUG);
}

export function buildPaidModelProviderPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizePaidModelProviderPreview(model: { paidModelProviderPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(PAID_MODEL_PROVIDER_PREVIEW_SLUG, model.paidModelProviderPreviewItems);
}

export function buildPaidModelProviderPreviewModel() {
  const paidModelProviderPreviewItems = buildPaidModelProviderPreviewItems();
  const paidModelProviderPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(PAID_MODEL_PROVIDER_PREVIEW_SLUG, paidModelProviderPreviewItems);
  return { ...paidModelProviderPreviewModel, paidModelProviderPreviewItems };
}
