import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  TOOL_BUILDER_TARGET_PACKET_LANGUAGE,
  buildUniversalProjectBuilderReview,
  buildUniversalProjectBuilderReviewBoundary,
  buildUniversalProjectBuilderReviewModelForSlug,
  buildUniversalProjectBuilderReviewPackets,
  buildUniversalProjectBuilderReviewStableKey as buildToolBuilderTargetPacketStableKey,
  summarizeUniversalProjectBuilderReviewForSlug,
  type UniversalProjectBuilderReviewPacketInput,
} from "../universal-project-builder-preview-kit";

export { TOOL_BUILDER_TARGET_PACKET_LANGUAGE, buildToolBuilderTargetPacketStableKey };

const TOOL_BUILDER_TARGET_PACKET_SLUG = "tool-builder-target-packet";

export function buildToolBuilderTargetPacket(input: UniversalProjectBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalProjectBuilderReview(TOOL_BUILDER_TARGET_PACKET_SLUG, input);
}

export function buildToolBuilderTargetPacketItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalProjectBuilderReviewPackets(TOOL_BUILDER_TARGET_PACKET_SLUG);
}

export function buildToolBuilderTargetPacketBoundary() {
  return buildUniversalProjectBuilderReviewBoundary();
}

export function summarizeToolBuilderTargetPacket(model: { toolBuilderTargetPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalProjectBuilderReviewForSlug(TOOL_BUILDER_TARGET_PACKET_SLUG, model.toolBuilderTargetPacketItems);
}

export function buildToolBuilderTargetPacketModel() {
  const toolBuilderTargetPacketItems = buildToolBuilderTargetPacketItems();
  const toolBuilderTargetPacketModel = buildUniversalProjectBuilderReviewModelForSlug(TOOL_BUILDER_TARGET_PACKET_SLUG, toolBuilderTargetPacketItems);
  return { ...toolBuilderTargetPacketModel, toolBuilderTargetPacketItems };
}
