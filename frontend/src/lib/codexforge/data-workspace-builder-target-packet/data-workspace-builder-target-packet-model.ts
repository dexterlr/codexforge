import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  DATA_WORKSPACE_BUILDER_TARGET_PACKET_LANGUAGE,
  buildUniversalProjectBuilderReview,
  buildUniversalProjectBuilderReviewBoundary,
  buildUniversalProjectBuilderReviewModelForSlug,
  buildUniversalProjectBuilderReviewPackets,
  buildUniversalProjectBuilderReviewStableKey as buildDataWorkspaceBuilderTargetPacketStableKey,
  summarizeUniversalProjectBuilderReviewForSlug,
  type UniversalProjectBuilderReviewPacketInput,
} from "../universal-project-builder-preview-kit";

export { DATA_WORKSPACE_BUILDER_TARGET_PACKET_LANGUAGE, buildDataWorkspaceBuilderTargetPacketStableKey };

const DATA_WORKSPACE_BUILDER_TARGET_PACKET_SLUG = "data-workspace-builder-target-packet";

export function buildDataWorkspaceBuilderTargetPacket(input: UniversalProjectBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalProjectBuilderReview(DATA_WORKSPACE_BUILDER_TARGET_PACKET_SLUG, input);
}

export function buildDataWorkspaceBuilderTargetPacketItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalProjectBuilderReviewPackets(DATA_WORKSPACE_BUILDER_TARGET_PACKET_SLUG);
}

export function buildDataWorkspaceBuilderTargetPacketBoundary() {
  return buildUniversalProjectBuilderReviewBoundary();
}

export function summarizeDataWorkspaceBuilderTargetPacket(model: { dataWorkspaceBuilderTargetPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalProjectBuilderReviewForSlug(DATA_WORKSPACE_BUILDER_TARGET_PACKET_SLUG, model.dataWorkspaceBuilderTargetPacketItems);
}

export function buildDataWorkspaceBuilderTargetPacketModel() {
  const dataWorkspaceBuilderTargetPacketItems = buildDataWorkspaceBuilderTargetPacketItems();
  const dataWorkspaceBuilderTargetPacketModel = buildUniversalProjectBuilderReviewModelForSlug(DATA_WORKSPACE_BUILDER_TARGET_PACKET_SLUG, dataWorkspaceBuilderTargetPacketItems);
  return { ...dataWorkspaceBuilderTargetPacketModel, dataWorkspaceBuilderTargetPacketItems };
}
