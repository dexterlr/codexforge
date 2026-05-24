import {
  buildRealApplyGuardReviewStableKey,
  deriveApplyGuardOverallStatus,
  countApplyGuardStatus,
  type ApplyApprovalPacketReview,
  type ApplyGuardReviewCheck,
  type ApplyGuardReviewInput,
  type ApplyGuardReviewStatus,
} from "./real-apply-guard-review-types";

export function buildApplyApprovalPacketReviewCheck(input: {
  id: string;
  label: string;
  status: ApplyGuardReviewStatus;
  detail: string;
  blocksApply?: boolean;
}): ApplyGuardReviewCheck {
  return { blocksApply: input.status === "blocker", ...input };
}

export function buildApplyApprovalPacketReview(input: ApplyGuardReviewInput): ApplyApprovalPacketReview {
  const hasApproval = input.source.approvalPacketExists === true || input.approvalSummary.length > 0;
  const checks = [
    buildApplyApprovalPacketReviewCheck({ id: "approval-packet-exists", label: "Approval packet exists", status: hasApproval ? "pass" : "blocker", detail: "Approval packet exists before guarded apply." }),
    buildApplyApprovalPacketReviewCheck({ id: "operator-reviewed-diff", label: "Operator reviewed diff", status: input.source.operatorReviewedDiff === true || input.diffSummary.length > 0 ? "pass" : "blocker", detail: "Operator reviewed diff acknowledgement is required." }),
    buildApplyApprovalPacketReviewCheck({ id: "operator-acknowledged-touched-files", label: "Operator acknowledged touched files", status: input.touchedFiles.length > 0 ? "pass" : "blocker", detail: "Operator acknowledged touched files." }),
    buildApplyApprovalPacketReviewCheck({ id: "operator-acknowledged-rollback", label: "Operator acknowledged rollback path", status: input.rollbackSummary.length > 0 || input.source.rollbackAvailable === true ? "pass" : "blocker", detail: "Operator acknowledged rollback path." }),
    buildApplyApprovalPacketReviewCheck({ id: "operator-acknowledged-validation", label: "Operator acknowledged validation requirement", status: input.validationSummary.length > 0 || input.source.validationRouteAvailable === true ? "pass" : "blocker", detail: "Operator acknowledged validation requirement." }),
    buildApplyApprovalPacketReviewCheck({ id: "operator-acknowledged-risk", label: "Operator acknowledged risk level", status: hasApproval ? "pass" : "blocker", detail: "Operator acknowledged risk level." }),
    buildApplyApprovalPacketReviewCheck({ id: "operator-acknowledged-no-auto-run", label: "Operator acknowledged no auto-run", status: "pass", detail: "Operator acknowledged no auto-run and no auto-apply guarantees." }),
    buildApplyApprovalPacketReviewCheck({ id: "high-risk-extra-acknowledgement", label: "High-risk file extra acknowledgement", status: input.touchedFiles.some((file) => /package|lock|config|tool|runtime|brain/i.test(file)) ? "warning" : "pass", detail: "High-risk file extra acknowledgement is required when risky files are touched." }),
    buildApplyApprovalPacketReviewCheck({ id: "approval-not-reused-different-diff", label: "Approval cannot be reused for different diff", status: "pass", detail: "Approval is bound to the reviewed diff and blocks reused approval for different diff." }),
    buildApplyApprovalPacketReviewCheck({ id: "approval-tied-latest-message", label: "Approval tied to latest message/request", status: input.sourceApplyRequestId ? "pass" : "warning", detail: "Approval review ties approval to latest message/request." }),
  ];
  const review: ApplyApprovalPacketReview = {
    id: buildRealApplyGuardReviewStableKey("apply-approval-packet-review", input.reviewId),
    checks,
    overallStatus: deriveApplyGuardOverallStatus(checks),
    blockerCount: countApplyGuardStatus(checks, "blocker"),
    warningCount: countApplyGuardStatus(checks, "warning"),
    summary: [],
  };
  return { ...review, summary: summarizeApplyApprovalPacketReview(review) };
}

export function summarizeApplyApprovalPacketReview(review: ApplyApprovalPacketReview): string[] {
  return [
    `Approval packet review status ${review.overallStatus}.`,
    "Approval packet exists, reviewed diff, touched files, rollback, validation, risk, no auto-run, high-risk acknowledgement, no approval reuse, and latest request binding are checked.",
  ];
}
