import type { ReviewInboxItem, ReviewInboxPriorityResult } from "./result-review-inbox-types";

export function buildReviewInboxPriority(item: ReviewInboxItem): ReviewInboxPriorityResult {
  if (item.status === "failed" || item.status === "blocked") return { priority: "now", reason: "Failure or blocked work should be handled before new work." };
  if (item.status === "needs-review") return { priority: "soon", reason: "Review this before treating the run as complete." };
  return { priority: "later", reason: "Ready items can wait until active blockers are clear." };
}

export function prioritizeReviewInboxItems(items: readonly ReviewInboxItem[]): ReviewInboxItem[] {
  const rank = { now: 0, soon: 1, later: 2 };
  return [...items].sort((a, b) => rank[buildReviewInboxPriority(a).priority] - rank[buildReviewInboxPriority(b).priority] || a.id.localeCompare(b.id));
}
