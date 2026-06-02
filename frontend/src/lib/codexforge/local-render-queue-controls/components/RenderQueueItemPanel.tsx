"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { RenderQueueItem } from "../local-render-queue-types";

export function RenderQueueItemPanel({ items }: { items: RenderQueueItem[] }) {
  return (
    <PreviewFoundationCard title="Queue items">
      {items.map((item) => (
        <div key={item.id}>
          <PreviewFoundationCopy>{item.label}: {item.reviewNote}</PreviewFoundationCopy>
          <PreviewFoundationPillList items={[item.state, item.resourcePosture, item.workerPreference]} />
        </div>
      ))}
    </PreviewFoundationCard>
  );
}
