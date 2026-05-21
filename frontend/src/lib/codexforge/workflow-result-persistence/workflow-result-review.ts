import { buildWorkflowResultStableKey, type WorkflowResultCapture, type WorkflowResultReview, type WorkflowResultReviewCheck, type WorkflowResultReviewCheckStatus } from "./workflow-result-types";

export function buildWorkflowResultReviewCheck(args: { label: string; status?: WorkflowResultReviewCheckStatus; detail?: string | null }): WorkflowResultReviewCheck {
  return {
    checkId: buildWorkflowResultStableKey("workflow-result-review-check", args.label, args.status ?? "unknown"),
    label: args.label,
    status: args.status ?? "unknown",
    detail: args.detail?.trim() || "Review required.",
  };
}

export function buildWorkflowResultReview(args: { sourceResultId?: string | null; capture?: WorkflowResultCapture | null; checks?: readonly WorkflowResultReviewCheck[] | null } = {}): WorkflowResultReview {
  const hasPossibleSecret = args.capture?.items.some((item) => item.sensitivity === "possible-secret") ?? false;
  const checks = args.checks?.length ? [...args.checks] : [
    buildWorkflowResultReviewCheck({ label: "selected file reviewed", status: "warning", detail: "Confirm the selected file path is intended." }),
    buildWorkflowResultReviewCheck({ label: "preview reviewed", status: "warning", detail: "Preview summary must be checked before apply handoff." }),
    buildWorkflowResultReviewCheck({ label: "approval reviewed", status: "warning", detail: "Approval remains outside this UI." }),
    buildWorkflowResultReviewCheck({ label: "rollback reviewed", status: "warning", detail: "Rollback note should be visible." }),
    buildWorkflowResultReviewCheck({ label: "validation reviewed", status: "unknown", detail: "Validation output must be supplied or marked not run." }),
    buildWorkflowResultReviewCheck({ label: "failure routed", status: "unknown", detail: "Failures route to Closed Loop Fix Workflow." }),
    buildWorkflowResultReviewCheck({ label: "secrets checked", status: hasPossibleSecret ? "blocker" : "warning", detail: hasPossibleSecret ? "Possible secret content must be redacted." : "Confirm no secrets before copying." }),
    buildWorkflowResultReviewCheck({ label: "output capped", status: "pass", detail: "Validation output excerpts are capped." }),
    buildWorkflowResultReviewCheck({ label: "memory candidate reviewed", status: "warning", detail: "No auto-promotion; memory review is optional." }),
    buildWorkflowResultReviewCheck({ label: "next action selected", status: "warning", detail: "Choose the next safe action before handoff." }),
  ];
  const blockerCount = checks.filter((check) => check.status === "blocker").length;
  const warningCount = checks.filter((check) => check.status === "warning" || check.status === "unknown").length;
  return {
    reviewId: buildWorkflowResultStableKey("workflow-result-review", args.sourceResultId ?? "manual", String(checks.length), String(blockerCount)),
    sourceResultId: args.sourceResultId?.trim() || "manual-session",
    checks,
    blockerCount,
    warningCount,
    reviewStatus: blockerCount > 0 ? "blocker" : warningCount > 0 ? "warning" : "pass",
    reviewRequired: true,
  };
}

export function summarizeWorkflowResultReview(review: WorkflowResultReview): string[] {
  return [
    `Review status ${review.reviewStatus}; ${review.blockerCount} blocker(s), ${review.warningCount} warning/unknown check(s).`,
    "Review checks include selected file reviewed, preview reviewed, approval reviewed, rollback reviewed, validation reviewed, failure routed, secrets checked, output capped, memory candidate reviewed, and next action selected.",
  ];
}
