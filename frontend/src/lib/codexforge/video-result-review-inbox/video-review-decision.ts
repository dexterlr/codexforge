import type { VideoReviewDecision } from "./video-review-inbox-types";

export function buildVideoReviewDecision(input: Partial<VideoReviewDecision> = {}): VideoReviewDecision {
  return {
    id: input.id ?? "video-review-decision-empty",
    itemId: input.itemId ?? "video-review-item-empty",
    decision: input.decision ?? "unknown",
    plainEnglish: input.plainEnglish ?? "No result exists yet, so the user can only prepare the review decision path.",
  };
}
