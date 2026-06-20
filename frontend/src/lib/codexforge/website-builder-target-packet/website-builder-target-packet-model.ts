import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  WEBSITE_BUILDER_TARGET_PACKET_LANGUAGE,
  buildUniversalProjectBuilderReview,
  buildUniversalProjectBuilderReviewBoundary,
  buildUniversalProjectBuilderReviewModelForSlug,
  buildUniversalProjectBuilderReviewPackets,
  buildUniversalProjectBuilderReviewStableKey as buildWebsiteBuilderTargetPacketStableKey,
  summarizeUniversalProjectBuilderReviewForSlug,
  type UniversalProjectBuilderReviewPacketInput,
} from "../universal-project-builder-preview-kit";

export { WEBSITE_BUILDER_TARGET_PACKET_LANGUAGE, buildWebsiteBuilderTargetPacketStableKey };

const WEBSITE_BUILDER_TARGET_PACKET_SLUG = "website-builder-target-packet";

export function buildWebsiteBuilderTargetPacket(input: UniversalProjectBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalProjectBuilderReview(WEBSITE_BUILDER_TARGET_PACKET_SLUG, input);
}

export function buildWebsiteBuilderTargetPacketItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalProjectBuilderReviewPackets(WEBSITE_BUILDER_TARGET_PACKET_SLUG);
}

export function buildWebsiteBuilderTargetPacketBoundary() {
  return buildUniversalProjectBuilderReviewBoundary();
}

export function summarizeWebsiteBuilderTargetPacket(model: { websiteBuilderTargetPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalProjectBuilderReviewForSlug(WEBSITE_BUILDER_TARGET_PACKET_SLUG, model.websiteBuilderTargetPacketItems);
}

export function buildWebsiteBuilderTargetPacketModel() {
  const websiteBuilderTargetPacketItems = buildWebsiteBuilderTargetPacketItems();
  const websiteBuilderTargetPacketModel = buildUniversalProjectBuilderReviewModelForSlug(WEBSITE_BUILDER_TARGET_PACKET_SLUG, websiteBuilderTargetPacketItems);
  return { ...websiteBuilderTargetPacketModel, websiteBuilderTargetPacketItems };
}
