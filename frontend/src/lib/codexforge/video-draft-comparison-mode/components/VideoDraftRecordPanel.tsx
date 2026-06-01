"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoDraftRecord } from "../video-draft-comparison-types";

export function VideoDraftRecordPanel({ drafts }: { drafts: VideoDraftRecord[] }) {
  return (
    <PreviewFoundationCard title="Draft slots">
      <PreviewFoundationCopy>Draft records are comparison slots for future artifacts. No playback or file reading happens here.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={drafts.map((draft) => `${draft.label}: ${draft.source}`)} />
    </PreviewFoundationCard>
  );
}
