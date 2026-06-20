import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PRO_MODEL_PROVIDER_TRIAL_PACKET_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildProModelProviderTrialPacketStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { PRO_MODEL_PROVIDER_TRIAL_PACKET_LANGUAGE, buildProModelProviderTrialPacketStableKey };

const PRO_MODEL_PROVIDER_TRIAL_PACKET_SLUG = "pro-model-provider-trial-packet";

export function buildProModelProviderTrialPacket(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(PRO_MODEL_PROVIDER_TRIAL_PACKET_SLUG, input);
}

export function buildProModelProviderTrialPacketItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(PRO_MODEL_PROVIDER_TRIAL_PACKET_SLUG);
}

export function buildProModelProviderTrialPacketBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeProModelProviderTrialPacket(model: { proModelProviderTrialPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(PRO_MODEL_PROVIDER_TRIAL_PACKET_SLUG, model.proModelProviderTrialPacketItems);
}

export function buildProModelProviderTrialPacketModel() {
  const proModelProviderTrialPacketItems = buildProModelProviderTrialPacketItems();
  const proModelProviderTrialPacketModel = buildModelRouterProviderReadinessReviewModelForSlug(PRO_MODEL_PROVIDER_TRIAL_PACKET_SLUG, proModelProviderTrialPacketItems);
  return { ...proModelProviderTrialPacketModel, proModelProviderTrialPacketItems };
}
