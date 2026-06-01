"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoReviewNextAction } from "../video-review-inbox-types";

export function VideoReviewNextActionPanel({ actions }: { actions: VideoReviewNextAction[] }) {
  return (
    <PreviewFoundationCard title="Next actions">
      <PreviewFoundationCopy>After a future result exists, the user can route it to compare, recovery, prompt fix, or artifact review.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={actions.map((action) => `${action.label}: ${action.plainEnglish}`)} />
    </PreviewFoundationCard>
  );
}
