import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  INTEGRATION_PACK_BUILDER_TARGET_PACKET_LANGUAGE,
  buildUniversalProjectBuilderReview,
  buildUniversalProjectBuilderReviewBoundary,
  buildUniversalProjectBuilderReviewModelForSlug,
  buildUniversalProjectBuilderReviewPackets,
  buildUniversalProjectBuilderReviewStableKey as buildIntegrationPackBuilderTargetPacketStableKey,
  summarizeUniversalProjectBuilderReviewForSlug,
  type UniversalProjectBuilderReviewPacketInput,
} from "../universal-project-builder-preview-kit";

export { INTEGRATION_PACK_BUILDER_TARGET_PACKET_LANGUAGE, buildIntegrationPackBuilderTargetPacketStableKey };

const INTEGRATION_PACK_BUILDER_TARGET_PACKET_SLUG = "integration-pack-builder-target-packet";

export function buildIntegrationPackBuilderTargetPacket(input: UniversalProjectBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalProjectBuilderReview(INTEGRATION_PACK_BUILDER_TARGET_PACKET_SLUG, input);
}

export function buildIntegrationPackBuilderTargetPacketItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalProjectBuilderReviewPackets(INTEGRATION_PACK_BUILDER_TARGET_PACKET_SLUG);
}

export function buildIntegrationPackBuilderTargetPacketBoundary() {
  return buildUniversalProjectBuilderReviewBoundary();
}

export function summarizeIntegrationPackBuilderTargetPacket(model: { integrationPackBuilderTargetPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalProjectBuilderReviewForSlug(INTEGRATION_PACK_BUILDER_TARGET_PACKET_SLUG, model.integrationPackBuilderTargetPacketItems);
}

export function buildIntegrationPackBuilderTargetPacketModel() {
  const integrationPackBuilderTargetPacketItems = buildIntegrationPackBuilderTargetPacketItems();
  const integrationPackBuilderTargetPacketModel = buildUniversalProjectBuilderReviewModelForSlug(INTEGRATION_PACK_BUILDER_TARGET_PACKET_SLUG, integrationPackBuilderTargetPacketItems);
  return { ...integrationPackBuilderTargetPacketModel, integrationPackBuilderTargetPacketItems };
}
