"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoExportTarget } from "../video-export-handoff-types";

export function VideoExportTargetPanel({ target }: { target: VideoExportTarget }) {
  return (
    <PreviewFoundationCard title="Export target">
      <PreviewFoundationCopy>{`${target.label}: ${target.kind}`}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{target.manualNote}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[target.resolution, target.duration, target.audioStatus]} />
    </PreviewFoundationCard>
  );
}
