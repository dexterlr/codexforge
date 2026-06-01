"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoArtifactRecord } from "../local-video-artifact-types";

export function VideoArtifactRecordPanel({ records }: { records: VideoArtifactRecord[] }) {
  return (
    <PreviewFoundationCard title="Artifact records">
      <PreviewFoundationCopy>These are the kinds of local creative outputs CodexForge will review later. No arbitrary file browsing happens here.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={records.map((record) => `${record.kind}: ${record.title}`)} />
    </PreviewFoundationCard>
  );
}
