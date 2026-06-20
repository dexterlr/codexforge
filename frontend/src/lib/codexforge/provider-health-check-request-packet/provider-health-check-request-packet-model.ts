import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PROVIDER_HEALTH_CHECK_REQUEST_PACKET_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildProviderHealthCheckRequestPacketStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { PROVIDER_HEALTH_CHECK_REQUEST_PACKET_LANGUAGE, buildProviderHealthCheckRequestPacketStableKey };

const PROVIDER_HEALTH_CHECK_REQUEST_PACKET_SLUG = "provider-health-check-request-packet";

export function buildProviderHealthCheckRequestPacket(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(PROVIDER_HEALTH_CHECK_REQUEST_PACKET_SLUG, input);
}

export function buildProviderHealthCheckRequestPacketItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(PROVIDER_HEALTH_CHECK_REQUEST_PACKET_SLUG);
}

export function buildProviderHealthCheckRequestPacketBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeProviderHealthCheckRequestPacket(model: { providerHealthCheckRequestPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(PROVIDER_HEALTH_CHECK_REQUEST_PACKET_SLUG, model.providerHealthCheckRequestPacketItems);
}

export function buildProviderHealthCheckRequestPacketModel() {
  const providerHealthCheckRequestPacketItems = buildProviderHealthCheckRequestPacketItems();
  const providerHealthCheckRequestPacketModel = buildModelRouterProviderReadinessReviewModelForSlug(PROVIDER_HEALTH_CHECK_REQUEST_PACKET_SLUG, providerHealthCheckRequestPacketItems);
  return { ...providerHealthCheckRequestPacketModel, providerHealthCheckRequestPacketItems };
}
