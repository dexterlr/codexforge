import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  DOCUMENTATION_PACK_BUILDER_TARGET_PACKET_LANGUAGE,
  buildUniversalProjectBuilderReview,
  buildUniversalProjectBuilderReviewBoundary,
  buildUniversalProjectBuilderReviewModelForSlug,
  buildUniversalProjectBuilderReviewPackets,
  buildUniversalProjectBuilderReviewStableKey as buildDocumentationPackBuilderTargetPacketStableKey,
  summarizeUniversalProjectBuilderReviewForSlug,
  type UniversalProjectBuilderReviewPacketInput,
} from "../universal-project-builder-preview-kit";

export { DOCUMENTATION_PACK_BUILDER_TARGET_PACKET_LANGUAGE, buildDocumentationPackBuilderTargetPacketStableKey };

const DOCUMENTATION_PACK_BUILDER_TARGET_PACKET_SLUG = "documentation-pack-builder-target-packet";

export function buildDocumentationPackBuilderTargetPacket(input: UniversalProjectBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalProjectBuilderReview(DOCUMENTATION_PACK_BUILDER_TARGET_PACKET_SLUG, input);
}

export function buildDocumentationPackBuilderTargetPacketItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalProjectBuilderReviewPackets(DOCUMENTATION_PACK_BUILDER_TARGET_PACKET_SLUG);
}

export function buildDocumentationPackBuilderTargetPacketBoundary() {
  return buildUniversalProjectBuilderReviewBoundary();
}

export function summarizeDocumentationPackBuilderTargetPacket(model: { documentationPackBuilderTargetPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalProjectBuilderReviewForSlug(DOCUMENTATION_PACK_BUILDER_TARGET_PACKET_SLUG, model.documentationPackBuilderTargetPacketItems);
}

export function buildDocumentationPackBuilderTargetPacketModel() {
  const documentationPackBuilderTargetPacketItems = buildDocumentationPackBuilderTargetPacketItems();
  const documentationPackBuilderTargetPacketModel = buildUniversalProjectBuilderReviewModelForSlug(DOCUMENTATION_PACK_BUILDER_TARGET_PACKET_SLUG, documentationPackBuilderTargetPacketItems);
  return { ...documentationPackBuilderTargetPacketModel, documentationPackBuilderTargetPacketItems };
}
