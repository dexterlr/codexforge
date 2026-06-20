import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILDER_OPERATOR_DECISION_PACKET_LANGUAGE,
  buildUniversalBuilderCockpitReview,
  buildUniversalBuilderCockpitReviewBoundary,
  buildUniversalBuilderCockpitReviewModelForSlug,
  buildUniversalBuilderCockpitReviewPackets,
  buildUniversalBuilderCockpitReviewStableKey as buildBuilderOperatorDecisionPacketStableKey,
  summarizeUniversalBuilderCockpitReviewForSlug,
  type UniversalBuilderCockpitReviewPacketInput,
} from "../universal-builder-cockpit-preview-kit";

export { BUILDER_OPERATOR_DECISION_PACKET_LANGUAGE, buildBuilderOperatorDecisionPacketStableKey };

const BUILDER_OPERATOR_DECISION_PACKET_SLUG = "builder-operator-decision-packet";

export function buildBuilderOperatorDecisionPacket(input: UniversalBuilderCockpitReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalBuilderCockpitReview(BUILDER_OPERATOR_DECISION_PACKET_SLUG, input);
}

export function buildBuilderOperatorDecisionPacketItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalBuilderCockpitReviewPackets(BUILDER_OPERATOR_DECISION_PACKET_SLUG);
}

export function buildBuilderOperatorDecisionPacketBoundary() {
  return buildUniversalBuilderCockpitReviewBoundary();
}

export function summarizeBuilderOperatorDecisionPacket(model: { builderOperatorDecisionPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalBuilderCockpitReviewForSlug(BUILDER_OPERATOR_DECISION_PACKET_SLUG, model.builderOperatorDecisionPacketItems);
}

export function buildBuilderOperatorDecisionPacketModel() {
  const builderOperatorDecisionPacketItems = buildBuilderOperatorDecisionPacketItems();
  const builderOperatorDecisionPacketModel = buildUniversalBuilderCockpitReviewModelForSlug(BUILDER_OPERATOR_DECISION_PACKET_SLUG, builderOperatorDecisionPacketItems);
  return { ...builderOperatorDecisionPacketModel, builderOperatorDecisionPacketItems };
}
