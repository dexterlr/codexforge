import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PAID_MODEL_PROVIDER_TRIAL_PACKET_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildPaidModelProviderTrialPacketStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { PAID_MODEL_PROVIDER_TRIAL_PACKET_LANGUAGE, buildPaidModelProviderTrialPacketStableKey };

const PAID_MODEL_PROVIDER_TRIAL_PACKET_SLUG = "paid-model-provider-trial-packet";

export function buildPaidModelProviderTrialPacket(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(PAID_MODEL_PROVIDER_TRIAL_PACKET_SLUG, input);
}

export function buildPaidModelProviderTrialPacketItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(PAID_MODEL_PROVIDER_TRIAL_PACKET_SLUG);
}

export function buildPaidModelProviderTrialPacketBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizePaidModelProviderTrialPacket(model: { paidModelProviderTrialPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(PAID_MODEL_PROVIDER_TRIAL_PACKET_SLUG, model.paidModelProviderTrialPacketItems);
}

export function buildPaidModelProviderTrialPacketModel() {
  const paidModelProviderTrialPacketItems = buildPaidModelProviderTrialPacketItems();
  const paidModelProviderTrialPacketModel = buildModelRouterProviderReadinessReviewModelForSlug(PAID_MODEL_PROVIDER_TRIAL_PACKET_SLUG, paidModelProviderTrialPacketItems);
  return { ...paidModelProviderTrialPacketModel, paidModelProviderTrialPacketItems };
}
