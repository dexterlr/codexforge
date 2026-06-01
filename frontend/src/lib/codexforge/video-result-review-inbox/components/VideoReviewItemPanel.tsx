"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoReviewItem } from "../video-review-inbox-types";

export function VideoReviewItemPanel({ items }: { items: VideoReviewItem[] }) {
  return (
    <PreviewFoundationCard title="Review items">
      <PreviewFoundationCopy>Items are review slots for future generated artifacts. There are no fake video results.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={items.map((item) => `${item.title}: ${item.status}`)} />
    </PreviewFoundationCard>
  );
}
