import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  TRADING_WORKSPACE_BUILDER_TARGET_PACKET_LANGUAGE,
  buildUniversalProjectBuilderReview,
  buildUniversalProjectBuilderReviewBoundary,
  buildUniversalProjectBuilderReviewModelForSlug,
  buildUniversalProjectBuilderReviewPackets,
  buildUniversalProjectBuilderReviewStableKey as buildTradingWorkspaceBuilderTargetPacketStableKey,
  summarizeUniversalProjectBuilderReviewForSlug,
  type UniversalProjectBuilderReviewPacketInput,
} from "../universal-project-builder-preview-kit";

export { TRADING_WORKSPACE_BUILDER_TARGET_PACKET_LANGUAGE, buildTradingWorkspaceBuilderTargetPacketStableKey };

const TRADING_WORKSPACE_BUILDER_TARGET_PACKET_SLUG = "trading-workspace-builder-target-packet";

export function buildTradingWorkspaceBuilderTargetPacket(input: UniversalProjectBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalProjectBuilderReview(TRADING_WORKSPACE_BUILDER_TARGET_PACKET_SLUG, input);
}

export function buildTradingWorkspaceBuilderTargetPacketItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalProjectBuilderReviewPackets(TRADING_WORKSPACE_BUILDER_TARGET_PACKET_SLUG);
}

export function buildTradingWorkspaceBuilderTargetPacketBoundary() {
  return buildUniversalProjectBuilderReviewBoundary();
}

export function summarizeTradingWorkspaceBuilderTargetPacket(model: { tradingWorkspaceBuilderTargetPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalProjectBuilderReviewForSlug(TRADING_WORKSPACE_BUILDER_TARGET_PACKET_SLUG, model.tradingWorkspaceBuilderTargetPacketItems);
}

export function buildTradingWorkspaceBuilderTargetPacketModel() {
  const tradingWorkspaceBuilderTargetPacketItems = buildTradingWorkspaceBuilderTargetPacketItems();
  const tradingWorkspaceBuilderTargetPacketModel = buildUniversalProjectBuilderReviewModelForSlug(TRADING_WORKSPACE_BUILDER_TARGET_PACKET_SLUG, tradingWorkspaceBuilderTargetPacketItems);
  return { ...tradingWorkspaceBuilderTargetPacketModel, tradingWorkspaceBuilderTargetPacketItems };
}
