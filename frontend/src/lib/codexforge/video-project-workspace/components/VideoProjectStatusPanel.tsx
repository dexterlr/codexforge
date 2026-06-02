"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoProjectStatus } from "../video-project-workspace-types";

export function VideoProjectStatusPanel({ status }: { status: VideoProjectStatus }) {
  return (
    <PreviewFoundationCard title="Project status">
      <PreviewFoundationCopy>{status.label}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{status.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={status.blockingSections.length > 0 ? status.blockingSections : ["No blocking section in this preview"]} />
    </PreviewFoundationCard>
  );
}
