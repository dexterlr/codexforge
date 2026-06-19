import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  LOCAL_MODEL_ROUTING_POLICY_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildLocalModelRoutingPolicyPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { LOCAL_MODEL_ROUTING_POLICY_PREVIEW_LANGUAGE, buildLocalModelRoutingPolicyPreviewStableKey };

const LOCAL_MODEL_ROUTING_POLICY_PREVIEW_SLUG = "local-model-routing-policy-preview";

export function buildLocalModelRoutingPolicyPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(LOCAL_MODEL_ROUTING_POLICY_PREVIEW_SLUG, input);
}

export function buildLocalModelRoutingPolicyPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(LOCAL_MODEL_ROUTING_POLICY_PREVIEW_SLUG);
}

export function buildLocalModelRoutingPolicyPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeLocalModelRoutingPolicyPreview(model: { localModelRoutingPolicyPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(LOCAL_MODEL_ROUTING_POLICY_PREVIEW_SLUG, model.localModelRoutingPolicyPreviewItems);
}

export function buildLocalModelRoutingPolicyPreviewModel() {
  const localModelRoutingPolicyPreviewItems = buildLocalModelRoutingPolicyPreviewItems();
  const localModelRoutingPolicyPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(LOCAL_MODEL_ROUTING_POLICY_PREVIEW_SLUG, localModelRoutingPolicyPreviewItems);
  return { ...localModelRoutingPolicyPreviewModel, localModelRoutingPolicyPreviewItems };
}
