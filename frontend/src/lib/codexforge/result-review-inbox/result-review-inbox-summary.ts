import { buildReviewInboxFilter, filterReviewInboxItems } from "./review-inbox-filter";
import { buildReviewInboxHandoff } from "./review-inbox-handoff";
import { buildDefaultReviewInboxItems } from "./review-inbox-item";
import { selectReviewInboxNextAction } from "./review-inbox-next-action";
import { prioritizeReviewInboxItems } from "./review-inbox-priority";
import { buildReviewInboxSafetyNote } from "./review-inbox-safety-note";
import type { ResultReviewInboxSummary } from "./result-review-inbox-types";

export function buildResultReviewInboxSummary(): ResultReviewInboxSummary {
  const filter = buildReviewInboxFilter("needs-review");
  const items = prioritizeReviewInboxItems(filterReviewInboxItems(buildDefaultReviewInboxItems(), filter));
  const nextAction = selectReviewInboxNextAction(items);
  return { title: "Review inbox", subtitle: "See what needs review, validation, recovery, or demo handoff.", primaryAction: "Review next item", items, filter, nextAction, safetyNote: buildReviewInboxSafetyNote(), handoff: buildReviewInboxHandoff(items[0]) };
}
