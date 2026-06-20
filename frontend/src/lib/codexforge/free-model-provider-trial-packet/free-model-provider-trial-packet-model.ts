import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FREE_MODEL_PROVIDER_TRIAL_PACKET_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildFreeModelProviderTrialPacketStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { FREE_MODEL_PROVIDER_TRIAL_PACKET_LANGUAGE, buildFreeModelProviderTrialPacketStableKey };

const FREE_MODEL_PROVIDER_TRIAL_PACKET_SLUG = "free-model-provider-trial-packet";

export function buildFreeModelProviderTrialPacket(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(FREE_MODEL_PROVIDER_TRIAL_PACKET_SLUG, input);
}

export function buildFreeModelProviderTrialPacketItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(FREE_MODEL_PROVIDER_TRIAL_PACKET_SLUG);
}

export function buildFreeModelProviderTrialPacketBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeFreeModelProviderTrialPacket(model: { freeModelProviderTrialPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(FREE_MODEL_PROVIDER_TRIAL_PACKET_SLUG, model.freeModelProviderTrialPacketItems);
}

export function buildFreeModelProviderTrialPacketModel() {
  const freeModelProviderTrialPacketItems = buildFreeModelProviderTrialPacketItems();
  const freeModelProviderTrialPacketModel = buildModelRouterProviderReadinessReviewModelForSlug(FREE_MODEL_PROVIDER_TRIAL_PACKET_SLUG, freeModelProviderTrialPacketItems);
  return { ...freeModelProviderTrialPacketModel, freeModelProviderTrialPacketItems };
}
