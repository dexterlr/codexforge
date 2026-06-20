import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  RESEARCH_PACK_BUILDER_TARGET_PACKET_LANGUAGE,
  buildUniversalProjectBuilderReview,
  buildUniversalProjectBuilderReviewBoundary,
  buildUniversalProjectBuilderReviewModelForSlug,
  buildUniversalProjectBuilderReviewPackets,
  buildUniversalProjectBuilderReviewStableKey as buildResearchPackBuilderTargetPacketStableKey,
  summarizeUniversalProjectBuilderReviewForSlug,
  type UniversalProjectBuilderReviewPacketInput,
} from "../universal-project-builder-preview-kit";

export { RESEARCH_PACK_BUILDER_TARGET_PACKET_LANGUAGE, buildResearchPackBuilderTargetPacketStableKey };

const RESEARCH_PACK_BUILDER_TARGET_PACKET_SLUG = "research-pack-builder-target-packet";

export function buildResearchPackBuilderTargetPacket(input: UniversalProjectBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalProjectBuilderReview(RESEARCH_PACK_BUILDER_TARGET_PACKET_SLUG, input);
}

export function buildResearchPackBuilderTargetPacketItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalProjectBuilderReviewPackets(RESEARCH_PACK_BUILDER_TARGET_PACKET_SLUG);
}

export function buildResearchPackBuilderTargetPacketBoundary() {
  return buildUniversalProjectBuilderReviewBoundary();
}

export function summarizeResearchPackBuilderTargetPacket(model: { researchPackBuilderTargetPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalProjectBuilderReviewForSlug(RESEARCH_PACK_BUILDER_TARGET_PACKET_SLUG, model.researchPackBuilderTargetPacketItems);
}

export function buildResearchPackBuilderTargetPacketModel() {
  const researchPackBuilderTargetPacketItems = buildResearchPackBuilderTargetPacketItems();
  const researchPackBuilderTargetPacketModel = buildUniversalProjectBuilderReviewModelForSlug(RESEARCH_PACK_BUILDER_TARGET_PACKET_SLUG, researchPackBuilderTargetPacketItems);
  return { ...researchPackBuilderTargetPacketModel, researchPackBuilderTargetPacketItems };
}
