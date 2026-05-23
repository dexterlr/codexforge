import { buildTrialReviewStableKey, type TrialValidationReview, type TrialValidationReviewItem, type TrialValidationStatus } from "./coding-flow-trial-review-types";

export function buildTrialValidationReviewItem(label: string, status: TrialValidationStatus = "not-tested"): TrialValidationReviewItem {
  return { itemId: buildTrialReviewStableKey("validation-review", label), label, status, note: "Review manually supplied validation evidence.", reviewRequired: true };
}

export function buildTrialValidationReview(items: TrialValidationReviewItem[] = DEFAULT_VALIDATION): TrialValidationReview {
  const hasBlocked = items.some((item) => item.status === "blocked");
  const hasFailed = items.some((item) => item.status === "failed");
  return { reviewId: "trial-validation-review", title: "Validation review", items: items.map((item) => ({ ...item })), overallStatus: hasBlocked ? "blocked" : hasFailed ? "failed" : "ready" };
}

export function summarizeTrialValidationReview(review = buildTrialValidationReview()): string {
  return `Validation review ${review.overallStatus} across ${review.items.length} checks.`;
}

const DEFAULT_VALIDATION = [
  buildTrialValidationReviewItem("command list was clear", "ready"),
  buildTrialValidationReviewItem("targeted smoke was clear", "ready"),
  buildTrialValidationReviewItem("manual run instructions clear", "ready"),
  buildTrialValidationReviewItem("output capture was clear", "ready"),
  buildTrialValidationReviewItem("pass/fail was obvious", "ready"),
  buildTrialValidationReviewItem("failure route was clear", "ready"),
  buildTrialValidationReviewItem("output too large handling clear", "ready"),
  buildTrialValidationReviewItem("no auto-run occurred", "ready"),
];
