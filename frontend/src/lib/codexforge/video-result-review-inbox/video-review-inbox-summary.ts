import type { VideoReviewDecisionKind, VideoReviewInboxSummary } from "./video-review-inbox-types";
import { buildVideoReviewDecision } from "./video-review-decision";
import { buildVideoReviewFilter, filterVideoReviewItems } from "./video-review-filter";
import { buildVideoReviewHandoff } from "./video-review-handoff";
import { buildDefaultVideoReviewItems } from "./video-review-item";
import { selectVideoReviewNextAction } from "./video-review-next-action";

export function buildVideoReviewInboxSummary(): VideoReviewInboxSummary {
  const items = buildDefaultVideoReviewItems();
  const filter = buildVideoReviewFilter();
  const visibleItems = filterVideoReviewItems(items, filter);
  const decisionKinds: VideoReviewDecisionKind[] = ["keep", "retry prompt", "retry parameters", "compare", "upscale later", "interpolate later", "send to recovery", "mark final candidate", "unknown"];
  const decisions = decisionKinds.map((decision, index) =>
    buildVideoReviewDecision({
      id: `video-review-decision-${index + 1}`,
      itemId: visibleItems[index % visibleItems.length]?.id ?? "video-review-item-empty",
      decision,
      plainEnglish: `${decision} is a possible manual review choice after a future result exists.`,
    })
  );
  const nextActions = decisions.map(selectVideoReviewNextAction);
  const handoff = buildVideoReviewHandoff();

  return {
    items,
    filter,
    decisions,
    nextActions,
    handoff,
    summary: summarizeVideoReviewInbox({ items, filter, decisions, nextActions, handoff, summary: "" }),
  };
}

export function summarizeVideoReviewInbox(summary: VideoReviewInboxSummary): string {
  return `${summary.items.length} empty review slots and ${summary.decisions.length} review decisions are ready for future results.`;
}
