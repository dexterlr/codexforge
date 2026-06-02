"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoExportChecklist } from "../video-export-handoff-types";

export function VideoExportChecklistPanel({ checklist }: { checklist: VideoExportChecklist }) {
  return (
    <PreviewFoundationCard title="Export checklist">
      <PreviewFoundationCopy>Checklist items show what is ready and what remains manual before any real export can be approved.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={checklist.items.map((item) => `${item.item}: ${item.complete ? "complete" : "manual review"}`)} />
    </PreviewFoundationCard>
  );
}
