"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { RenderVersionChange } from "../render-version-history-types";

export function RenderVersionChangePanel({ changes }: { changes: RenderVersionChange[] }) {
  return (
    <PreviewFoundationCard title="What changed">
      <PreviewFoundationCopy>Changes explain why drafts and candidates differ without showing raw JSON above the fold.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={changes.map((change) => `${change.kind}: ${change.plainEnglish}`)} />
    </PreviewFoundationCard>
  );
}
