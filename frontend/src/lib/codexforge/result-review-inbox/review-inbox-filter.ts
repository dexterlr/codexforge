import type { ReviewInboxFilter, ReviewInboxItem, ReviewInboxStatus } from "./result-review-inbox-types";

export function buildReviewInboxFilter(status: ReviewInboxStatus | "all" = "needs-review"): ReviewInboxFilter {
  return { status, label: status === "all" ? "All items" : "Needs review" };
}

export function filterReviewInboxItems(items: readonly ReviewInboxItem[], filter: ReviewInboxFilter): ReviewInboxItem[] {
  if (filter.status === "all") return [...items];
  return items.filter((item) => item.status === filter.status || (filter.status === "needs-review" && item.status === "failed"));
}
