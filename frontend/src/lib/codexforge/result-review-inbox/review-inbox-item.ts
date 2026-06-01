import type { ReviewInboxItem, ReviewInboxItemKind, ReviewInboxStatus } from "./result-review-inbox-types";

export function buildReviewInboxItem(id: string, kind: ReviewInboxItemKind, title: string, status: ReviewInboxStatus, route: string, summary: string): ReviewInboxItem {
  return { id, kind, title, status, route, summary };
}

export function buildDefaultReviewInboxItems(): ReviewInboxItem[] {
  return [
    buildReviewInboxItem("review-apply-evidence", "apply-evidence", "Apply evidence needs review", "needs-review", "/apply-evidence", "Confirm the apply note matches what happened."),
    buildReviewInboxItem("review-validation-failed", "validation-result", "Validation result failed", "failed", "/recovery", "Route the failure into recovery before retry."),
    buildReviewInboxItem("review-workflow-result", "workflow-result", "Workflow result ready", "ready", "/workflow-results", "Copy a clean result handoff."),
    buildReviewInboxItem("review-run-history", "run-history", "Run history handoff", "needs-review", "/run-history", "Check recent work before starting another task."),
    buildReviewInboxItem("review-demo-note", "demo-note", "Demo note", "ready", "/demo", "Confirm what remains manual before demo."),
  ];
}
