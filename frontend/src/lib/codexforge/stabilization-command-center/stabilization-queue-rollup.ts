import type {
  StabilizationCommandCenterInput,
  StabilizationQueueRiskPosture,
  StabilizationQueueRollup,
  StabilizationQueueRollupItem,
  StabilizationRelatedSurface,
  StabilizationSummaryLike,
} from "./stabilization-types";
import { buildStabilizationStableKey, readStabilizationCount } from "./stabilization-types";

function highestPriority(summary?: StabilizationSummaryLike | null): string {
  const item = summary?.highestPriorityItem;
  return (
    item?.title?.trim() ||
    item?.sourceRecommendationTitle?.trim() ||
    item?.primaryFile?.trim() ||
    "No highest priority item yet"
  );
}

function countFromSummary(summary?: StabilizationSummaryLike | null): number {
  return readStabilizationCount(
    summary?.totalQueueItems ?? summary?.signalCount ?? summary?.totalSignals ?? summary?.count,
    0
  );
}

function riskPosture(count: number, readyCount: number, blockedCount: number): StabilizationQueueRiskPosture {
  if (blockedCount > 0) return "blocked";
  if (count === 0) return "unknown";
  if (readyCount > 0) return "ready";
  return "needs-review";
}

export function buildStabilizationQueueRollupItem(args: {
  id?: string | null;
  label: string;
  summary?: StabilizationSummaryLike | null;
  count?: number | null;
  readyCount?: number | null;
  blockedCount?: number | null;
  highestPriority?: string | null;
  riskPosture?: StabilizationQueueRiskPosture | null;
  nextAction: string;
  targetRoute: StabilizationRelatedSurface;
}): StabilizationQueueRollupItem {
  const count = readStabilizationCount(args.count ?? countFromSummary(args.summary), 0);
  const readyCount = readStabilizationCount(args.readyCount ?? args.summary?.readyCount, 0);
  const blockedCount = readStabilizationCount(args.blockedCount ?? args.summary?.blockedCount, 0);

  return {
    id: args.id ?? buildStabilizationStableKey("stabilization-rollup", args.label),
    label: args.label,
    count,
    readyCount,
    blockedCount,
    highestPriority: args.highestPriority?.trim() || highestPriority(args.summary),
    riskPosture: args.riskPosture ?? riskPosture(count, readyCount, blockedCount),
    nextAction: args.summary?.nextSafeAction?.trim() || args.nextAction,
    targetRoute: args.targetRoute,
  };
}

export function buildStabilizationQueueRollup(input: StabilizationCommandCenterInput = {}): StabilizationQueueRollup {
  const items: StabilizationQueueRollupItem[] = [
    buildStabilizationQueueRollupItem({
      label: "Regression Triage",
      summary: input.regressionTriageSummary,
      nextAction: "Review regression triage.",
      targetRoute: "/ai",
    }),
    buildStabilizationQueueRollupItem({
      label: "Regression Fix Queue",
      summary: input.regressionFixQueueSummary,
      nextAction: "Review regression fix queue.",
      targetRoute: "/ai",
    }),
    buildStabilizationQueueRollupItem({
      label: "Grounded Fix Recommendation",
      summary: input.groundedFixRecommendationSummary,
      nextAction: "Review grounded fix recommendation before queuing.",
      targetRoute: "/ai",
    }),
    buildStabilizationQueueRollupItem({
      label: "Patch Preview Queue",
      summary: input.patchQueueSummary,
      nextAction: "Prepare Safe Patch Preview after queue review.",
      targetRoute: "/ai",
    }),
    buildStabilizationQueueRollupItem({
      label: "Preview Diff Composer",
      summary: input.previewDiffComposerSummary,
      nextAction: "Compose preview diff after Safe Patch Preview review.",
      targetRoute: "/ai",
    }),
    buildStabilizationQueueRollupItem({
      label: "Patch Application Gate",
      summary: input.applyGateSummary,
      nextAction: "Review apply gate and keep mutation blocked.",
      targetRoute: "/ai",
    }),
    buildStabilizationQueueRollupItem({
      label: "Apply-Diff Dry Run",
      summary: input.applyDiffDryRunSummary,
      nextAction: "Review dry-run result manually.",
      targetRoute: "/ai",
    }),
    buildStabilizationQueueRollupItem({
      label: "Apply-Diff Execution Gate",
      summary: input.applyDiffExecutionGateSummary,
      nextAction: "Review execution gate; no direct dispatch here.",
      targetRoute: "/ai",
    }),
    buildStabilizationQueueRollupItem({
      label: "Post-Apply Verification",
      summary: input.postApplyVerificationSummary,
      nextAction: "Prepare post-apply verification checklist.",
      targetRoute: "/ai",
    }),
    buildStabilizationQueueRollupItem({
      label: "Verification Ingestion",
      summary: input.verificationIngestionSummary,
      nextAction: "Paste verification output for normalization.",
      targetRoute: "/ai",
    }),
    buildStabilizationQueueRollupItem({
      label: "Global Activity Feed",
      count: 1,
      readyCount: 1,
      nextAction: "Review Activity Feed before mutation-capable gates.",
      targetRoute: "/stabilization",
    }),
    buildStabilizationQueueRollupItem({
      label: "Memory Review",
      summary: input.memoryReviewSummary,
      nextAction: "Review memory candidates; no auto-promotion.",
      targetRoute: "/memory",
    }),
    buildStabilizationQueueRollupItem({
      label: "Brain Merge Review",
      summary: input.brainMergeReviewSummary,
      nextAction: "Review Brain merge; no graph mutation from stabilization.",
      targetRoute: "/memory",
    }),
  ];

  const totalCount = items.reduce((sum, item) => sum + item.count, 0);
  const readyCount = items.reduce((sum, item) => sum + item.readyCount, 0);
  const blockedCount = items.reduce((sum, item) => sum + item.blockedCount, 0);

  return {
    id: "stabilization-queue-rollup",
    items,
    totalCount,
    readyCount,
    blockedCount,
    summary: summarizeStabilizationQueueRollup({ items, totalCount, readyCount, blockedCount }),
  };
}

export function summarizeStabilizationQueueRollup(rollup: Pick<StabilizationQueueRollup, "items" | "totalCount" | "readyCount" | "blockedCount">): string[] {
  const blockedSurfaces = rollup.items.filter((item) => item.riskPosture === "blocked").length;
  return [
    `${rollup.items.length} stabilization queue surfaces are rolled up.`,
    `${rollup.totalCount} total visible items, ${rollup.readyCount} ready, and ${rollup.blockedCount} blocked.`,
    `${blockedSurfaces} queue surfaces currently report blocked posture.`,
  ];
}
