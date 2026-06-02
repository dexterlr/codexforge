"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoExportSafety } from "../video-export-handoff-types";

export function VideoExportSafetyPanel({ safety }: { safety: VideoExportSafety }) {
  return (
    <PreviewFoundationCard title="Export safety">
      <PreviewFoundationCopy>{safety.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={safety.rules} />
    </PreviewFoundationCard>
  );
}
