import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  DASHBOARD_BUILDER_TARGET_PACKET_LANGUAGE,
  buildUniversalProjectBuilderReview,
  buildUniversalProjectBuilderReviewBoundary,
  buildUniversalProjectBuilderReviewModelForSlug,
  buildUniversalProjectBuilderReviewPackets,
  buildUniversalProjectBuilderReviewStableKey as buildDashboardBuilderTargetPacketStableKey,
  summarizeUniversalProjectBuilderReviewForSlug,
  type UniversalProjectBuilderReviewPacketInput,
} from "../universal-project-builder-preview-kit";

export { DASHBOARD_BUILDER_TARGET_PACKET_LANGUAGE, buildDashboardBuilderTargetPacketStableKey };

const DASHBOARD_BUILDER_TARGET_PACKET_SLUG = "dashboard-builder-target-packet";

export function buildDashboardBuilderTargetPacket(input: UniversalProjectBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalProjectBuilderReview(DASHBOARD_BUILDER_TARGET_PACKET_SLUG, input);
}

export function buildDashboardBuilderTargetPacketItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalProjectBuilderReviewPackets(DASHBOARD_BUILDER_TARGET_PACKET_SLUG);
}

export function buildDashboardBuilderTargetPacketBoundary() {
  return buildUniversalProjectBuilderReviewBoundary();
}

export function summarizeDashboardBuilderTargetPacket(model: { dashboardBuilderTargetPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalProjectBuilderReviewForSlug(DASHBOARD_BUILDER_TARGET_PACKET_SLUG, model.dashboardBuilderTargetPacketItems);
}

export function buildDashboardBuilderTargetPacketModel() {
  const dashboardBuilderTargetPacketItems = buildDashboardBuilderTargetPacketItems();
  const dashboardBuilderTargetPacketModel = buildUniversalProjectBuilderReviewModelForSlug(DASHBOARD_BUILDER_TARGET_PACKET_SLUG, dashboardBuilderTargetPacketItems);
  return { ...dashboardBuilderTargetPacketModel, dashboardBuilderTargetPacketItems };
}
