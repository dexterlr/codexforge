"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoReviewFilter } from "../video-review-inbox-types";

export function VideoReviewFilterPanel({ filter }: { filter: VideoReviewFilter }) {
  return (
    <PreviewFoundationCard title="Review filter">
      <PreviewFoundationCopy>{filter.label} keeps future result review focused without deleting or mutating artifacts.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[`Status: ${filter.status}`, "No delete action", "No render action"]} />
    </PreviewFoundationCard>
  );
}
