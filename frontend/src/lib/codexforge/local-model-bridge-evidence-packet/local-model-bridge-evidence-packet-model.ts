import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  LOCAL_MODEL_BRIDGE_EVIDENCE_PACKET_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildLocalModelBridgeEvidencePacketStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { LOCAL_MODEL_BRIDGE_EVIDENCE_PACKET_LANGUAGE, buildLocalModelBridgeEvidencePacketStableKey };

const LOCAL_MODEL_BRIDGE_EVIDENCE_PACKET_SLUG = "local-model-bridge-evidence-packet";

export function buildLocalModelBridgeEvidencePacket(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(LOCAL_MODEL_BRIDGE_EVIDENCE_PACKET_SLUG, input);
}

export function buildLocalModelBridgeEvidencePacketItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(LOCAL_MODEL_BRIDGE_EVIDENCE_PACKET_SLUG);
}

export function buildLocalModelBridgeEvidencePacketBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeLocalModelBridgeEvidencePacket(model: { localModelBridgeEvidencePacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(LOCAL_MODEL_BRIDGE_EVIDENCE_PACKET_SLUG, model.localModelBridgeEvidencePacketItems);
}

export function buildLocalModelBridgeEvidencePacketModel() {
  const localModelBridgeEvidencePacketItems = buildLocalModelBridgeEvidencePacketItems();
  const localModelBridgeEvidencePacketModel = buildModelRouterProviderReadinessReviewModelForSlug(LOCAL_MODEL_BRIDGE_EVIDENCE_PACKET_SLUG, localModelBridgeEvidencePacketItems);
  return { ...localModelBridgeEvidencePacketModel, localModelBridgeEvidencePacketItems };
}
