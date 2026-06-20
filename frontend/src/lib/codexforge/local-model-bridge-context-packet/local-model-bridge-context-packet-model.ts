import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  LOCAL_MODEL_BRIDGE_CONTEXT_PACKET_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildLocalModelBridgeContextPacketStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { LOCAL_MODEL_BRIDGE_CONTEXT_PACKET_LANGUAGE, buildLocalModelBridgeContextPacketStableKey };

const LOCAL_MODEL_BRIDGE_CONTEXT_PACKET_SLUG = "local-model-bridge-context-packet";

export function buildLocalModelBridgeContextPacket(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(LOCAL_MODEL_BRIDGE_CONTEXT_PACKET_SLUG, input);
}

export function buildLocalModelBridgeContextPacketItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(LOCAL_MODEL_BRIDGE_CONTEXT_PACKET_SLUG);
}

export function buildLocalModelBridgeContextPacketBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeLocalModelBridgeContextPacket(model: { localModelBridgeContextPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(LOCAL_MODEL_BRIDGE_CONTEXT_PACKET_SLUG, model.localModelBridgeContextPacketItems);
}

export function buildLocalModelBridgeContextPacketModel() {
  const localModelBridgeContextPacketItems = buildLocalModelBridgeContextPacketItems();
  const localModelBridgeContextPacketModel = buildModelRouterProviderReadinessReviewModelForSlug(LOCAL_MODEL_BRIDGE_CONTEXT_PACKET_SLUG, localModelBridgeContextPacketItems);
  return { ...localModelBridgeContextPacketModel, localModelBridgeContextPacketItems };
}
