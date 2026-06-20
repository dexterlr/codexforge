import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  UNIVERSAL_BUILDER_MVP_TRIAL_PACKET_LANGUAGE,
  buildUniversalProjectBuilderReview,
  buildUniversalProjectBuilderReviewBoundary,
  buildUniversalProjectBuilderReviewModelForSlug,
  buildUniversalProjectBuilderReviewPackets,
  buildUniversalProjectBuilderReviewStableKey as buildUniversalBuilderMvpTrialPacketStableKey,
  summarizeUniversalProjectBuilderReviewForSlug,
  type UniversalProjectBuilderReviewPacketInput,
} from "../universal-project-builder-preview-kit";

export { UNIVERSAL_BUILDER_MVP_TRIAL_PACKET_LANGUAGE, buildUniversalBuilderMvpTrialPacketStableKey };

const UNIVERSAL_BUILDER_MVP_TRIAL_PACKET_SLUG = "universal-builder-mvp-trial-packet";

export function buildUniversalBuilderMvpTrialPacket(input: UniversalProjectBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalProjectBuilderReview(UNIVERSAL_BUILDER_MVP_TRIAL_PACKET_SLUG, input);
}

export function buildUniversalBuilderMvpTrialPacketItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalProjectBuilderReviewPackets(UNIVERSAL_BUILDER_MVP_TRIAL_PACKET_SLUG);
}

export function buildUniversalBuilderMvpTrialPacketBoundary() {
  return buildUniversalProjectBuilderReviewBoundary();
}

export function summarizeUniversalBuilderMvpTrialPacket(model: { universalBuilderMvpTrialPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalProjectBuilderReviewForSlug(UNIVERSAL_BUILDER_MVP_TRIAL_PACKET_SLUG, model.universalBuilderMvpTrialPacketItems);
}

export function buildUniversalBuilderMvpTrialPacketModel() {
  const universalBuilderMvpTrialPacketItems = buildUniversalBuilderMvpTrialPacketItems();
  const universalBuilderMvpTrialPacketModel = buildUniversalProjectBuilderReviewModelForSlug(UNIVERSAL_BUILDER_MVP_TRIAL_PACKET_SLUG, universalBuilderMvpTrialPacketItems);
  return { ...universalBuilderMvpTrialPacketModel, universalBuilderMvpTrialPacketItems };
}
