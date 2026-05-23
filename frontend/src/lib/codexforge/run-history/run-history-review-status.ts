import { buildRunHistoryStableKey, type RunHistoryRecord, type RunHistoryReview, type RunHistoryReviewCheck, type RunHistoryReviewCheckStatus } from "./run-history-types";

export function buildRunHistoryReviewCheck(input: { label: string; status?: RunHistoryReviewCheckStatus; detail?: string | null }): RunHistoryReviewCheck {
  return {
    checkId: buildRunHistoryStableKey("run-history-review-check", input.label, input.status ?? "unknown"),
    label: input.label,
    status: input.status ?? "unknown",
    detail: input.detail?.trim() || "Review required before handoff, export, or memory candidate use.",
  };
}

export function buildRunHistoryReviewStatus(record: RunHistoryRecord): RunHistoryReview {
  const checks = [
    buildRunHistoryReviewCheck({ label: "workflow result reviewed", status: record.reviewStatus === "needs-review" ? "warning" : "pass", detail: "Workflow result reviewed status is visible." }),
    buildRunHistoryReviewCheck({ label: "validation output reviewed", status: record.validationStatus === "failed" ? "blocker" : record.validationStatus === "unknown" ? "unknown" : "pass", detail: "Validation output reviewed before routing." }),
    buildRunHistoryReviewCheck({ label: "secrets checked", status: record.privacySensitivity === "possible-secret" ? "blocker" : "pass", detail: "Secrets checked and excluded from copyable outputs." }),
    buildRunHistoryReviewCheck({ label: "next action selected", status: record.currentNextAction ? "pass" : "warning", detail: record.currentNextAction }),
    buildRunHistoryReviewCheck({ label: "handoff reviewed", status: record.handoffReadiness === "ready" ? "pass" : "warning", detail: "Handoff reviewed status must be explicit." }),
    buildRunHistoryReviewCheck({ label: "memory candidate reviewed", status: record.memoryCandidateReadiness === "ready-for-review" ? "warning" : "pass", detail: "Memory review remains separate with no-auto-promotion." }),
    buildRunHistoryReviewCheck({ label: "operator note present if needed", status: record.reviewStatus === "blocked" ? "warning" : "pass", detail: "Blocked runs should carry the smallest unblock note." }),
    buildRunHistoryReviewCheck({ label: "failure routed if failed", status: record.validationStatus === "failed" ? "blocker" : "pass", detail: "Failed validation routes to closed-loop." }),
    buildRunHistoryReviewCheck({ label: "completion guidance ready", status: record.validationStatus === "passed" ? "pass" : "warning", detail: "Commit guidance appears only after review and passing validation." }),
  ];
  const blockerCount = checks.filter((check) => check.status === "blocker").length;
  const warningCount = checks.filter((check) => check.status === "warning").length;
  return {
    reviewId: buildRunHistoryStableKey("run-history-review", record.runId, blockerCount, warningCount),
    sourceRunId: record.runId,
    checks,
    blockerCount,
    warningCount,
    reviewStatus: blockerCount > 0 ? "blocker" : warningCount > 0 ? "warning" : "pass",
    reviewRequired: true,
  };
}

export function summarizeRunHistoryReviewStatus(review: RunHistoryReview): string[] {
  return [
    `${review.checks.length} review checks, ${review.blockerCount} blocker(s), ${review.warningCount} warning(s).`,
    "Review required before handoff, export, or memory review candidate use.",
  ];
}
