import type { ReviewInboxSafetyNote } from "./result-review-inbox-types";

export function buildReviewInboxSafetyNote(): ReviewInboxSafetyNote {
  return { title: "Review-only inbox", notes: ["no hidden mutation", "no fake persistence claims", "no auto-apply", "no auto-run", "approval required", "preserve latest-message authority"] };
}
