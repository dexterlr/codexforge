import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PROVIDER_HEALTH_CHECK_RESULT_PACKET_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildProviderHealthCheckResultPacketStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { PROVIDER_HEALTH_CHECK_RESULT_PACKET_LANGUAGE, buildProviderHealthCheckResultPacketStableKey };

const PROVIDER_HEALTH_CHECK_RESULT_PACKET_SLUG = "provider-health-check-result-packet";

export function buildProviderHealthCheckResultPacket(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(PROVIDER_HEALTH_CHECK_RESULT_PACKET_SLUG, input);
}

export function buildProviderHealthCheckResultPacketItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(PROVIDER_HEALTH_CHECK_RESULT_PACKET_SLUG);
}

export function buildProviderHealthCheckResultPacketBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeProviderHealthCheckResultPacket(model: { providerHealthCheckResultPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(PROVIDER_HEALTH_CHECK_RESULT_PACKET_SLUG, model.providerHealthCheckResultPacketItems);
}

export function buildProviderHealthCheckResultPacketModel() {
  const providerHealthCheckResultPacketItems = buildProviderHealthCheckResultPacketItems();
  const providerHealthCheckResultPacketModel = buildModelRouterProviderReadinessReviewModelForSlug(PROVIDER_HEALTH_CHECK_RESULT_PACKET_SLUG, providerHealthCheckResultPacketItems);
  return { ...providerHealthCheckResultPacketModel, providerHealthCheckResultPacketItems };
}
