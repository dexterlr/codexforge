import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PRO_MODEL_ROUTING_POLICY_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildProModelRoutingPolicyPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { PRO_MODEL_ROUTING_POLICY_PREVIEW_LANGUAGE, buildProModelRoutingPolicyPreviewStableKey };

const PRO_MODEL_ROUTING_POLICY_PREVIEW_SLUG = "pro-model-routing-policy-preview";

export function buildProModelRoutingPolicyPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(PRO_MODEL_ROUTING_POLICY_PREVIEW_SLUG, input);
}

export function buildProModelRoutingPolicyPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(PRO_MODEL_ROUTING_POLICY_PREVIEW_SLUG);
}

export function buildProModelRoutingPolicyPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeProModelRoutingPolicyPreview(model: { proModelRoutingPolicyPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(PRO_MODEL_ROUTING_POLICY_PREVIEW_SLUG, model.proModelRoutingPolicyPreviewItems);
}

export function buildProModelRoutingPolicyPreviewModel() {
  const proModelRoutingPolicyPreviewItems = buildProModelRoutingPolicyPreviewItems();
  const proModelRoutingPolicyPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(PRO_MODEL_ROUTING_POLICY_PREVIEW_SLUG, proModelRoutingPolicyPreviewItems);
  return { ...proModelRoutingPolicyPreviewModel, proModelRoutingPolicyPreviewItems };
}
