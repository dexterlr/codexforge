import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  UNIVERSAL_BUILDER_COCKPIT_TRIAL_PACKET_LANGUAGE,
  buildUniversalBuilderCockpitReview,
  buildUniversalBuilderCockpitReviewBoundary,
  buildUniversalBuilderCockpitReviewModelForSlug,
  buildUniversalBuilderCockpitReviewPackets,
  buildUniversalBuilderCockpitReviewStableKey as buildUniversalBuilderCockpitTrialPacketStableKey,
  summarizeUniversalBuilderCockpitReviewForSlug,
  type UniversalBuilderCockpitReviewPacketInput,
} from "../universal-builder-cockpit-preview-kit";

export { UNIVERSAL_BUILDER_COCKPIT_TRIAL_PACKET_LANGUAGE, buildUniversalBuilderCockpitTrialPacketStableKey };

const UNIVERSAL_BUILDER_COCKPIT_TRIAL_PACKET_SLUG = "universal-builder-cockpit-trial-packet";

export function buildUniversalBuilderCockpitTrialPacket(input: UniversalBuilderCockpitReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalBuilderCockpitReview(UNIVERSAL_BUILDER_COCKPIT_TRIAL_PACKET_SLUG, input);
}

export function buildUniversalBuilderCockpitTrialPacketItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalBuilderCockpitReviewPackets(UNIVERSAL_BUILDER_COCKPIT_TRIAL_PACKET_SLUG);
}

export function buildUniversalBuilderCockpitTrialPacketBoundary() {
  return buildUniversalBuilderCockpitReviewBoundary();
}

export function summarizeUniversalBuilderCockpitTrialPacket(model: { universalBuilderCockpitTrialPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalBuilderCockpitReviewForSlug(UNIVERSAL_BUILDER_COCKPIT_TRIAL_PACKET_SLUG, model.universalBuilderCockpitTrialPacketItems);
}

export function buildUniversalBuilderCockpitTrialPacketModel() {
  const universalBuilderCockpitTrialPacketItems = buildUniversalBuilderCockpitTrialPacketItems();
  const universalBuilderCockpitTrialPacketModel = buildUniversalBuilderCockpitReviewModelForSlug(UNIVERSAL_BUILDER_COCKPIT_TRIAL_PACKET_SLUG, universalBuilderCockpitTrialPacketItems);
  return { ...universalBuilderCockpitTrialPacketModel, universalBuilderCockpitTrialPacketItems };
}
