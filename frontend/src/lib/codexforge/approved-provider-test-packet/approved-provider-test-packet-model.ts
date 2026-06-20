import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  APPROVED_PROVIDER_TEST_PACKET_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildApprovedProviderTestPacketStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { APPROVED_PROVIDER_TEST_PACKET_LANGUAGE, buildApprovedProviderTestPacketStableKey };

const APPROVED_PROVIDER_TEST_PACKET_SLUG = "approved-provider-test-packet";

export function buildApprovedProviderTestPacket(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(APPROVED_PROVIDER_TEST_PACKET_SLUG, input);
}

export function buildApprovedProviderTestPacketItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(APPROVED_PROVIDER_TEST_PACKET_SLUG);
}

export function buildApprovedProviderTestPacketBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeApprovedProviderTestPacket(model: { approvedProviderTestPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(APPROVED_PROVIDER_TEST_PACKET_SLUG, model.approvedProviderTestPacketItems);
}

export function buildApprovedProviderTestPacketModel() {
  const approvedProviderTestPacketItems = buildApprovedProviderTestPacketItems();
  const approvedProviderTestPacketModel = buildModelRouterProviderReadinessReviewModelForSlug(APPROVED_PROVIDER_TEST_PACKET_SLUG, approvedProviderTestPacketItems);
  return { ...approvedProviderTestPacketModel, approvedProviderTestPacketItems };
}
