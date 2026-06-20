import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  APP_BUILDER_TARGET_PACKET_LANGUAGE,
  buildUniversalProjectBuilderReview,
  buildUniversalProjectBuilderReviewBoundary,
  buildUniversalProjectBuilderReviewModelForSlug,
  buildUniversalProjectBuilderReviewPackets,
  buildUniversalProjectBuilderReviewStableKey as buildAppBuilderTargetPacketStableKey,
  summarizeUniversalProjectBuilderReviewForSlug,
  type UniversalProjectBuilderReviewPacketInput,
} from "../universal-project-builder-preview-kit";

export { APP_BUILDER_TARGET_PACKET_LANGUAGE, buildAppBuilderTargetPacketStableKey };

const APP_BUILDER_TARGET_PACKET_SLUG = "app-builder-target-packet";

export function buildAppBuilderTargetPacket(input: UniversalProjectBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalProjectBuilderReview(APP_BUILDER_TARGET_PACKET_SLUG, input);
}

export function buildAppBuilderTargetPacketItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalProjectBuilderReviewPackets(APP_BUILDER_TARGET_PACKET_SLUG);
}

export function buildAppBuilderTargetPacketBoundary() {
  return buildUniversalProjectBuilderReviewBoundary();
}

export function summarizeAppBuilderTargetPacket(model: { appBuilderTargetPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalProjectBuilderReviewForSlug(APP_BUILDER_TARGET_PACKET_SLUG, model.appBuilderTargetPacketItems);
}

export function buildAppBuilderTargetPacketModel() {
  const appBuilderTargetPacketItems = buildAppBuilderTargetPacketItems();
  const appBuilderTargetPacketModel = buildUniversalProjectBuilderReviewModelForSlug(APP_BUILDER_TARGET_PACKET_SLUG, appBuilderTargetPacketItems);
  return { ...appBuilderTargetPacketModel, appBuilderTargetPacketItems };
}
