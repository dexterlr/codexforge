import type { PatchPreviewQueueItem, PatchPreviewQueueReadiness, PatchPreviewQueueSummary } from "./patch-preview-queue-types";
import { rankPatchPreviewQueueItems } from "./queue-priority";
import { buildPatchPreviewQueueReadiness } from "./queue-readiness";

export function buildPatchPreviewQueueSummary(args: {
  items: readonly PatchPreviewQueueItem[];
  readiness?: PatchPreviewQueueReadiness;
}): PatchPreviewQueueSummary {
  const readiness = args.readiness ?? buildPatchPreviewQueueReadiness(args.items);
  const ranked = rankPatchPreviewQueueItems(args.items);
  const highestPriorityItem = ranked[0] ?? null;
  const averageConfidence =
    args.items.length === 0
      ? 0
      : Math.round((args.items.reduce((sum, item) => sum + item.confidence, 0) / args.items.length) * 100) / 100;
  const criticalRiskCount = args.items.filter((item) => item.riskLevel === "critical").length;
  const blockedCount = readiness.blockedCount;
  const readyCount = readiness.readyCount;
  const nextSafeAction =
    highestPriorityItem && readyCount > 0
      ? `Review queued patch preview for ${highestPriorityItem.primaryFile}.`
      : blockedCount > 0
        ? "Resolve blocked queue policy or readiness checks."
        : "Queue a reviewed fix recommendation before Safe Patch Preview.";

  return {
    id: "patch-preview-queue-summary",
    totalQueueItems: args.items.length,
    readyCount,
    blockedCount,
    highestPriorityItem,
    criticalRiskCount,
    averageConfidence,
    nextSafeAction,
    summary: summarizePatchPreviewQueueSession({
      totalQueueItems: args.items.length,
      readyCount,
      blockedCount,
      highestPriorityItem,
      criticalRiskCount,
      averageConfidence,
      nextSafeAction,
    }),
  };
}

export function summarizePatchPreviewQueueSession(summary: Omit<PatchPreviewQueueSummary, "id" | "summary">): string[] {
  return [
    `${summary.totalQueueItems} patch preview queue items are visible.`,
    `${summary.readyCount} ready and ${summary.blockedCount} blocked queue items.`,
    summary.highestPriorityItem
      ? `Highest priority item is ${summary.highestPriorityItem.sourceRecommendationTitle}.`
      : "No highest priority item yet.",
    `${summary.criticalRiskCount} critical risk items; average confidence is ${summary.averageConfidence}.`,
    `Next safe action: ${summary.nextSafeAction}`,
  ];
}
