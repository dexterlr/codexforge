import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SPECIALIST_MODEL_ROUTING_POLICY_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildSpecialistModelRoutingPolicyPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { SPECIALIST_MODEL_ROUTING_POLICY_PREVIEW_LANGUAGE, buildSpecialistModelRoutingPolicyPreviewStableKey };

const SPECIALIST_MODEL_ROUTING_POLICY_PREVIEW_SLUG = "specialist-model-routing-policy-preview";

export function buildSpecialistModelRoutingPolicyPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(SPECIALIST_MODEL_ROUTING_POLICY_PREVIEW_SLUG, input);
}

export function buildSpecialistModelRoutingPolicyPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(SPECIALIST_MODEL_ROUTING_POLICY_PREVIEW_SLUG);
}

export function buildSpecialistModelRoutingPolicyPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeSpecialistModelRoutingPolicyPreview(model: { specialistModelRoutingPolicyPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(SPECIALIST_MODEL_ROUTING_POLICY_PREVIEW_SLUG, model.specialistModelRoutingPolicyPreviewItems);
}

export function buildSpecialistModelRoutingPolicyPreviewModel() {
  const specialistModelRoutingPolicyPreviewItems = buildSpecialistModelRoutingPolicyPreviewItems();
  const specialistModelRoutingPolicyPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(SPECIALIST_MODEL_ROUTING_POLICY_PREVIEW_SLUG, specialistModelRoutingPolicyPreviewItems);
  return { ...specialistModelRoutingPolicyPreviewModel, specialistModelRoutingPolicyPreviewItems };
}
