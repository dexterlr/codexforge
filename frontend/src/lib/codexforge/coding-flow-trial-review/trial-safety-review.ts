import { buildTrialReviewStableKey, type TrialSafetyReview, type TrialSafetyReviewCheck, type TrialSafetyStatus } from "./coding-flow-trial-review-types";

export function buildTrialSafetyReviewCheck(label: string, status: TrialSafetyStatus = "pass"): TrialSafetyReviewCheck {
  return { checkId: buildTrialReviewStableKey("safety-check", label), label, status, note: "Confirm during manual trial review." };
}

export function buildTrialSafetyReview(checks: TrialSafetyReviewCheck[] = DEFAULT_SAFETY): TrialSafetyReview {
  const overallStatus = checks.some((check) => check.status === "blocker") ? "blocker" : checks.some((check) => check.status === "warning") ? "warning" : "pass";
  return { reviewId: "trial-safety-review", title: "Safety review", checks: checks.map((check) => ({ ...check })), overallStatus };
}

export function summarizeTrialSafetyReview(review = buildTrialSafetyReview()): string {
  return `Safety ${review.overallStatus}: ${review.checks.length} checks reviewed.`;
}

const DEFAULT_SAFETY = [
  buildTrialSafetyReviewCheck("no auto-apply"),
  buildTrialSafetyReviewCheck("no auto-run"),
  buildTrialSafetyReviewCheck("approval required before apply"),
  buildTrialSafetyReviewCheck("rollback guidance visible"),
  buildTrialSafetyReviewCheck("no direct write-file UI"),
  buildTrialSafetyReviewCheck("no direct run-command UI"),
  buildTrialSafetyReviewCheck("latest-message authority preserved"),
  buildTrialSafetyReviewCheck("safety copy compact enough"),
  buildTrialSafetyReviewCheck("dangerous files warned"),
  buildTrialSafetyReviewCheck("safe file guidance useful"),
];
