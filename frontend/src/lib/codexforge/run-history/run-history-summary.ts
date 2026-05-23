import type { RunHistoryFilterId, RunHistoryRecord, RunHistorySummary, RunHistoryTimeline } from "./run-history-types";

export function buildRunHistorySummary(args: { records: readonly RunHistoryRecord[]; selectedFilter?: RunHistoryFilterId; nextSafeAction?: string | null }): RunHistorySummary {
  const records = [...args.records];
  return {
    recordCount: records.length,
    needsReviewCount: records.filter((record) => record.reviewStatus === "needs-review").length,
    completedCount: records.filter((record) => record.reviewStatus === "complete" || record.validationStatus === "passed").length,
    failedCount: records.filter((record) => record.validationStatus === "failed").length,
    handoffReadyCount: records.filter((record) => record.handoffReadiness === "ready").length,
    memoryCandidateCount: records.filter((record) => record.memoryCandidateReadiness === "ready-for-review").length,
    selectedFilter: args.selectedFilter ?? "all",
    nextSafeAction: args.nextSafeAction?.trim() || "Review recent runs and copy a handoff only after review.",
  };
}

export function summarizeRunHistorySession(summary: RunHistorySummary | RunHistoryTimeline): string[] {
  if ("sourceMode" in summary) {
    return [
      `${summary.totalCount} records in timeline; ${summary.needsReviewCount} need review; ${summary.failedCount} failed.`,
      `Timeline is ${summary.sourceMode}; copyable only, no hidden persistence.`,
      `Next safe action: ${summary.nextAction}.`,
    ];
  }
  return [
    `${summary.recordCount} records; ${summary.needsReviewCount} need review; ${summary.completedCount} complete; ${summary.failedCount} failed.`,
    `${summary.handoffReadyCount} handoff ready; ${summary.memoryCandidateCount} memory candidate(s); selected filter ${summary.selectedFilter}.`,
    `Next safe action: ${summary.nextSafeAction}`,
  ];
}
