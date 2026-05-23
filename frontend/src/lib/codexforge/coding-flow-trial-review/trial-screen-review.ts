import { buildTrialReviewStableKey, type TrialReviewRoute, type TrialScreenRating, type TrialScreenReview, type TrialScreenReviewItem } from "./coding-flow-trial-review-types";

export function buildTrialScreenReviewItem(route: TrialReviewRoute, screenLabel: string, rating: TrialScreenRating = "not-tested"): TrialScreenReviewItem {
  return {
    itemId: buildTrialReviewStableKey("screen", route),
    route,
    screenLabel,
    visited: false,
    purposeUnderstood: false,
    primaryActionClear: false,
    layoutRating: rating,
    wordingRating: rating,
    frictionNotes: "Record friction observed on this screen.",
    suggestedFix: "Keep the smallest route-level copy or layout fix.",
  };
}

export function buildTrialScreenReview(items: TrialScreenReviewItem[] = DEFAULT_SCREENS): TrialScreenReview {
  return { reviewId: "trial-screen-review", title: "Screen review", items: items.map((item) => ({ ...item })) };
}

export function summarizeTrialScreenReview(review = buildTrialScreenReview()): string {
  const visited = review.items.filter((item) => item.visited).length;
  return `${visited} of ${review.items.length} screens marked visited.`;
}

const DEFAULT_SCREENS = [
  buildTrialScreenReviewItem("/start", "Start"),
  buildTrialScreenReviewItem("/code-flow/trial", "Coding Trial"),
  buildTrialScreenReviewItem("/code-flow", "Code Flow"),
  buildTrialScreenReviewItem("/files", "Files"),
  buildTrialScreenReviewItem("/apply-validation", "Apply Validation"),
  buildTrialScreenReviewItem("/validation", "Validation"),
  buildTrialScreenReviewItem("/workflow-results", "Workflow Results"),
  buildTrialScreenReviewItem("/run-history", "Run History"),
  buildTrialScreenReviewItem("/closed-loop", "Closed Loop"),
];
