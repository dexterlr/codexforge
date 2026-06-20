import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SPECIALIST_MODEL_PROVIDER_TRIAL_PACKET_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildSpecialistModelProviderTrialPacketStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { SPECIALIST_MODEL_PROVIDER_TRIAL_PACKET_LANGUAGE, buildSpecialistModelProviderTrialPacketStableKey };

const SPECIALIST_MODEL_PROVIDER_TRIAL_PACKET_SLUG = "specialist-model-provider-trial-packet";

export function buildSpecialistModelProviderTrialPacket(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(SPECIALIST_MODEL_PROVIDER_TRIAL_PACKET_SLUG, input);
}

export function buildSpecialistModelProviderTrialPacketItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(SPECIALIST_MODEL_PROVIDER_TRIAL_PACKET_SLUG);
}

export function buildSpecialistModelProviderTrialPacketBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeSpecialistModelProviderTrialPacket(model: { specialistModelProviderTrialPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(SPECIALIST_MODEL_PROVIDER_TRIAL_PACKET_SLUG, model.specialistModelProviderTrialPacketItems);
}

export function buildSpecialistModelProviderTrialPacketModel() {
  const specialistModelProviderTrialPacketItems = buildSpecialistModelProviderTrialPacketItems();
  const specialistModelProviderTrialPacketModel = buildModelRouterProviderReadinessReviewModelForSlug(SPECIALIST_MODEL_PROVIDER_TRIAL_PACKET_SLUG, specialistModelProviderTrialPacketItems);
  return { ...specialistModelProviderTrialPacketModel, specialistModelProviderTrialPacketItems };
}
