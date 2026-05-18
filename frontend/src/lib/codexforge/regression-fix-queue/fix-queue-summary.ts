import type {
  RegressionFixQueueItem,
  RegressionFixQueueReadiness,
  RegressionFixQueueSummary,
} from "./regression-fix-queue-types";
import { rankRegressionFixQueueItems } from "./fix-queue-priority";
import { buildRegressionFixQueueReadiness } from "./fix-queue-readiness";

export function buildRegressionFixQueueSummary(args: {
  items: readonly RegressionFixQueueItem[];
  readiness?: RegressionFixQueueReadiness;
}): RegressionFixQueueSummary {
  const readiness = args.readiness ?? buildRegressionFixQueueReadiness(args.items);
  const ranked = rankRegressionFixQueueItems(args.items);
  const highestPriorityItem = ranked[0] ?? null;
  const affectedFileCount = new Set(args.items.flatMap((item) => item.targetFiles)).size;
  const urgentCount = args.items.filter((item) => item.priority === "urgent").length;
  const investigationNeededCount = args.items.filter((item) => item.investigationNeeded).length;
  const nextSafeAction =
    highestPriorityItem && readiness.readyCount > 0
      ? `Review regression fix queue handoff for ${highestPriorityItem.primaryFile}.`
      : readiness.blockedCount > 0
        ? "Resolve blocked regression fix queue policy or readiness checks."
        : "Review regression fix queue candidates before Safe Patch Preview handoff.";
  const summary: Omit<RegressionFixQueueSummary, "id" | "summary"> = {
    totalQueueItems: args.items.length,
    readyCount: readiness.readyCount,
    blockedCount: readiness.blockedCount,
    urgentCount,
    investigationNeededCount,
    highestPriorityItem,
    affectedFileCount,
    nextSafeAction,
  };

  return {
    id: "regression-fix-queue-summary",
    ...summary,
    summary: summarizeRegressionFixQueueSession(summary),
  };
}

export function summarizeRegressionFixQueueSession(
  summary: Omit<RegressionFixQueueSummary, "id" | "summary">
): string[] {
  return [
    `${summary.totalQueueItems} regression fix queue items are visible.`,
    `${summary.readyCount} ready, ${summary.blockedCount} blocked, and ${summary.urgentCount} urgent queue items.`,
    `${summary.investigationNeededCount} items need investigation before preview.`,
    summary.highestPriorityItem ? `Highest priority item is ${summary.highestPriorityItem.title}.` : "No highest priority item yet.",
    `${summary.affectedFileCount} affected files are visible.`,
    `Next safe action: ${summary.nextSafeAction}`,
  ];
}
