"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoArtifactPreview } from "../local-video-artifact-types";

export function VideoArtifactPreviewPanel({ previews }: { previews: VideoArtifactPreview[] }) {
  return (
    <PreviewFoundationCard title="Preview placeholders">
      <PreviewFoundationCopy>Future thumbnails or playback previews can appear only after a safe artifact source exists.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={previews.map((preview) => preview.placeholder)} />
    </PreviewFoundationCard>
  );
}
