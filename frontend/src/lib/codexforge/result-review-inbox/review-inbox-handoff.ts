import type { ReviewInboxHandoff, ReviewInboxItem } from "./result-review-inbox-types";

export function buildReviewInboxHandoff(item?: ReviewInboxItem): ReviewInboxHandoff {
  const target = item?.title ?? "Nothing needs review yet";
  return { title: "Review handoff", copyText: `Review inbox item: ${target}. Confirm evidence, validation, recovery, and manual next step before closing the loop.` };
}
