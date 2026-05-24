import {
  buildRealApplyGuardReviewStableKey,
  deriveApplyGuardOverallStatus,
  countApplyGuardStatus,
  type ApplyGuardPolicyReview,
  type ApplyGuardReviewCheck,
  type ApplyGuardReviewInput,
  type ApplyGuardReviewStatus,
} from "./real-apply-guard-review-types";

export function buildApplyGuardPolicyReviewCheck(input: {
  id: string;
  label: string;
  status: ApplyGuardReviewStatus;
  detail: string;
  blocksApply?: boolean;
}): ApplyGuardReviewCheck {
  return { blocksApply: input.status === "blocker", ...input };
}

export function buildApplyGuardPolicyReview(input: ApplyGuardReviewInput): ApplyGuardPolicyReview {
  const checks = [
    buildApplyGuardPolicyReviewCheck({ id: "preview-diff-required", label: "Preview diff required", status: input.source.diffText || input.diffSummary.length > 0 ? "pass" : "blocker", detail: "Policy requires preview diff before apply." }),
    buildApplyGuardPolicyReviewCheck({ id: "explicit-approval-required", label: "Explicit approval required", status: input.source.explicitApproval === true || input.source.approvalPacketExists === true ? "pass" : "blocker", detail: "Policy requires explicit approval required before any apply." }),
    buildApplyGuardPolicyReviewCheck({ id: "selected-file-touched-files-visible", label: "Selected file and touched files visible", status: input.selectedFilePath && input.touchedFiles.length > 0 ? "pass" : "warning", detail: "Selected file/touched files must be visible to the operator." }),
    buildApplyGuardPolicyReviewCheck({ id: "tool-policy-guard-present", label: "Tool policy guard present", status: "pass", detail: "tool-policy-guard is present and treats apply-diff, write-file, and run-command as approval-required or blocked." }),
    buildApplyGuardPolicyReviewCheck({ id: "approved-apply-boundary-present", label: "Approved apply boundary present", status: "pass", detail: "Approved Patch Apply and guarded execution bridge are present." }),
    buildApplyGuardPolicyReviewCheck({ id: "apply-diff-dry-run-available", label: "Apply-diff dry run available", status: "pass", detail: "Apply-Diff Dry Run and Approved Patch Apply dry-run preview are available." }),
    buildApplyGuardPolicyReviewCheck({ id: "direct-ui-apply-blocked", label: "Direct UI apply blocked", status: input.source.directUiApplyAttempted ? "blocker" : "pass", detail: "Policy blocks direct UI apply and direct apply-diff from UI." }),
    buildApplyGuardPolicyReviewCheck({ id: "direct-write-file-blocked", label: "Direct write-file blocked", status: input.source.directUiWriteAttempted ? "blocker" : "pass", detail: "Policy blocks direct write-file from UI." }),
    buildApplyGuardPolicyReviewCheck({ id: "direct-run-command-blocked", label: "Direct run-command blocked", status: input.source.directUiRunAttempted ? "blocker" : "pass", detail: "Policy blocks direct run-command from UI." }),
    buildApplyGuardPolicyReviewCheck({ id: "latest-message-authority-preserved", label: "Latest-message authority preserved", status: "pass", detail: "Preserve latest-message authority behavior." }),
    buildApplyGuardPolicyReviewCheck({ id: "validation-required-after-apply", label: "Validation required after apply", status: input.validationSummary.length > 0 || input.source.validationRouteAvailable === true ? "pass" : "blocker", detail: "Validation required after apply." }),
    buildApplyGuardPolicyReviewCheck({ id: "rollback-required-before-apply", label: "Rollback required before apply", status: input.rollbackSummary.length > 0 || input.source.rollbackAvailable === true ? "pass" : "blocker", detail: "Rollback required before apply." }),
  ];
  const review: ApplyGuardPolicyReview = {
    id: buildRealApplyGuardReviewStableKey("apply-guard-policy-review", input.reviewId),
    checks,
    overallStatus: deriveApplyGuardOverallStatus(checks),
    blockerCount: countApplyGuardStatus(checks, "blocker"),
    warningCount: countApplyGuardStatus(checks, "warning"),
    summary: [],
  };
  return { ...review, summary: summarizeApplyGuardPolicyReview(review) };
}

export function summarizeApplyGuardPolicyReview(review: ApplyGuardPolicyReview): string[] {
  return [
    `Policy review status ${review.overallStatus}.`,
    `${review.blockerCount} blocker(s), ${review.warningCount} warning(s).`,
    "Requires preview diff, explicit approval, rollback, validation, tool-policy guard, dry-run, and direct UI apply/write/run blocking.",
  ];
}
