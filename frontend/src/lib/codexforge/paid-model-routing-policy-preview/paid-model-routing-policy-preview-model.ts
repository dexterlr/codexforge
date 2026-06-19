import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PAID_MODEL_ROUTING_POLICY_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildPaidModelRoutingPolicyPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { PAID_MODEL_ROUTING_POLICY_PREVIEW_LANGUAGE, buildPaidModelRoutingPolicyPreviewStableKey };

const PAID_MODEL_ROUTING_POLICY_PREVIEW_SLUG = "paid-model-routing-policy-preview";

export function buildPaidModelRoutingPolicyPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(PAID_MODEL_ROUTING_POLICY_PREVIEW_SLUG, input);
}

export function buildPaidModelRoutingPolicyPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(PAID_MODEL_ROUTING_POLICY_PREVIEW_SLUG);
}

export function buildPaidModelRoutingPolicyPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizePaidModelRoutingPolicyPreview(model: { paidModelRoutingPolicyPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(PAID_MODEL_ROUTING_POLICY_PREVIEW_SLUG, model.paidModelRoutingPolicyPreviewItems);
}

export function buildPaidModelRoutingPolicyPreviewModel() {
  const paidModelRoutingPolicyPreviewItems = buildPaidModelRoutingPolicyPreviewItems();
  const paidModelRoutingPolicyPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(PAID_MODEL_ROUTING_POLICY_PREVIEW_SLUG, paidModelRoutingPolicyPreviewItems);
  return { ...paidModelRoutingPolicyPreviewModel, paidModelRoutingPolicyPreviewItems };
}
