import type { VideoReviewDecision, VideoReviewNextAction } from "./video-review-inbox-types";

export function selectVideoReviewNextAction(decision: VideoReviewDecision): VideoReviewNextAction {
  if (decision.decision === "compare") {
    return { id: "video-review-next-compare", label: "Compare drafts", href: "/video-compare", plainEnglish: "Compare two future drafts before choosing one." };
  }
  if (decision.decision === "send to recovery") {
    return { id: "video-review-next-recovery", label: "Open recovery", href: "/video-recovery", plainEnglish: "Use a safe recovery path for failed or confusing results." };
  }
  if (decision.decision === "retry prompt") {
    return { id: "video-review-next-prompt", label: "Fix prompt", href: "/video-prompt", plainEnglish: "Improve the prompt before another future package." };
  }

  return { id: "video-review-next-artifacts", label: "Review artifacts", href: "/video-artifacts", plainEnglish: "Keep artifacts organized before the next decision." };
}
