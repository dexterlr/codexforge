"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoArtifactMetadata } from "../local-video-artifact-types";

export function VideoArtifactMetadataPanel({ metadata }: { metadata: VideoArtifactMetadata[] }) {
  return (
    <PreviewFoundationCard title="Metadata">
      <PreviewFoundationCopy>Metadata explains source, review state, and handoff context without opening local files.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={metadata.flatMap((item) => item.details.map((detail) => `${item.artifactId}: ${detail}`))} />
    </PreviewFoundationCard>
  );
}
