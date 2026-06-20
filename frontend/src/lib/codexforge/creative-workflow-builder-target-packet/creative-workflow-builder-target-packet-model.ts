import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  CREATIVE_WORKFLOW_BUILDER_TARGET_PACKET_LANGUAGE,
  buildUniversalProjectBuilderReview,
  buildUniversalProjectBuilderReviewBoundary,
  buildUniversalProjectBuilderReviewModelForSlug,
  buildUniversalProjectBuilderReviewPackets,
  buildUniversalProjectBuilderReviewStableKey as buildCreativeWorkflowBuilderTargetPacketStableKey,
  summarizeUniversalProjectBuilderReviewForSlug,
  type UniversalProjectBuilderReviewPacketInput,
} from "../universal-project-builder-preview-kit";

export { CREATIVE_WORKFLOW_BUILDER_TARGET_PACKET_LANGUAGE, buildCreativeWorkflowBuilderTargetPacketStableKey };

const CREATIVE_WORKFLOW_BUILDER_TARGET_PACKET_SLUG = "creative-workflow-builder-target-packet";

export function buildCreativeWorkflowBuilderTargetPacket(input: UniversalProjectBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalProjectBuilderReview(CREATIVE_WORKFLOW_BUILDER_TARGET_PACKET_SLUG, input);
}

export function buildCreativeWorkflowBuilderTargetPacketItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalProjectBuilderReviewPackets(CREATIVE_WORKFLOW_BUILDER_TARGET_PACKET_SLUG);
}

export function buildCreativeWorkflowBuilderTargetPacketBoundary() {
  return buildUniversalProjectBuilderReviewBoundary();
}

export function summarizeCreativeWorkflowBuilderTargetPacket(model: { creativeWorkflowBuilderTargetPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalProjectBuilderReviewForSlug(CREATIVE_WORKFLOW_BUILDER_TARGET_PACKET_SLUG, model.creativeWorkflowBuilderTargetPacketItems);
}

export function buildCreativeWorkflowBuilderTargetPacketModel() {
  const creativeWorkflowBuilderTargetPacketItems = buildCreativeWorkflowBuilderTargetPacketItems();
  const creativeWorkflowBuilderTargetPacketModel = buildUniversalProjectBuilderReviewModelForSlug(CREATIVE_WORKFLOW_BUILDER_TARGET_PACKET_SLUG, creativeWorkflowBuilderTargetPacketItems);
  return { ...creativeWorkflowBuilderTargetPacketModel, creativeWorkflowBuilderTargetPacketItems };
}
