import type { AssistedCodingReviewState } from "./assisted-coding-mode-types";

export function buildAssistedCodingReviewState(needsReview = true): AssistedCodingReviewState {
  return { needsReview, label: needsReview ? "Review inbox has items to check" : "Nothing needs review yet", route: "/review-inbox" };
}
