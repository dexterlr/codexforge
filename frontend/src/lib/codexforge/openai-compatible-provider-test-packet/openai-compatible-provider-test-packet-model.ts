import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  OPENAI_COMPATIBLE_PROVIDER_TEST_PACKET_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildOpenAICompatibleProviderTestPacketStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { OPENAI_COMPATIBLE_PROVIDER_TEST_PACKET_LANGUAGE, buildOpenAICompatibleProviderTestPacketStableKey };

const OPENAI_COMPATIBLE_PROVIDER_TEST_PACKET_SLUG = "openai-compatible-provider-test-packet";

export function buildOpenAICompatibleProviderTestPacket(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(OPENAI_COMPATIBLE_PROVIDER_TEST_PACKET_SLUG, input);
}

export function buildOpenAICompatibleProviderTestPacketItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(OPENAI_COMPATIBLE_PROVIDER_TEST_PACKET_SLUG);
}

export function buildOpenAICompatibleProviderTestPacketBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeOpenAICompatibleProviderTestPacket(model: { openAICompatibleProviderTestPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(OPENAI_COMPATIBLE_PROVIDER_TEST_PACKET_SLUG, model.openAICompatibleProviderTestPacketItems);
}

export function buildOpenAICompatibleProviderTestPacketModel() {
  const openAICompatibleProviderTestPacketItems = buildOpenAICompatibleProviderTestPacketItems();
  const openAICompatibleProviderTestPacketModel = buildModelRouterProviderReadinessReviewModelForSlug(OPENAI_COMPATIBLE_PROVIDER_TEST_PACKET_SLUG, openAICompatibleProviderTestPacketItems);
  return { ...openAICompatibleProviderTestPacketModel, openAICompatibleProviderTestPacketItems };
}
