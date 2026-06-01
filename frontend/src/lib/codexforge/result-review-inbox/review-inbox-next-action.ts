import type { ReviewInboxItem, ReviewInboxNextAction } from "./result-review-inbox-types";

export function selectReviewInboxNextAction(items: readonly ReviewInboxItem[]): ReviewInboxNextAction {
  const next = items[0];
  if (!next) return { label: "Nothing needs review yet", href: "/assist", reason: "Start a safe coding goal when ready." };
  return { label: next.status === "failed" ? "Open recovery" : "Review next item", href: next.route, reason: next.summary };
}
