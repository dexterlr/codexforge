import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FREE_MODEL_ROUTING_POLICY_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildFreeModelRoutingPolicyPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { FREE_MODEL_ROUTING_POLICY_PREVIEW_LANGUAGE, buildFreeModelRoutingPolicyPreviewStableKey };

const FREE_MODEL_ROUTING_POLICY_PREVIEW_SLUG = "free-model-routing-policy-preview";

export function buildFreeModelRoutingPolicyPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(FREE_MODEL_ROUTING_POLICY_PREVIEW_SLUG, input);
}

export function buildFreeModelRoutingPolicyPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(FREE_MODEL_ROUTING_POLICY_PREVIEW_SLUG);
}

export function buildFreeModelRoutingPolicyPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeFreeModelRoutingPolicyPreview(model: { freeModelRoutingPolicyPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(FREE_MODEL_ROUTING_POLICY_PREVIEW_SLUG, model.freeModelRoutingPolicyPreviewItems);
}

export function buildFreeModelRoutingPolicyPreviewModel() {
  const freeModelRoutingPolicyPreviewItems = buildFreeModelRoutingPolicyPreviewItems();
  const freeModelRoutingPolicyPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(FREE_MODEL_ROUTING_POLICY_PREVIEW_SLUG, freeModelRoutingPolicyPreviewItems);
  return { ...freeModelRoutingPolicyPreviewModel, freeModelRoutingPolicyPreviewItems };
}
