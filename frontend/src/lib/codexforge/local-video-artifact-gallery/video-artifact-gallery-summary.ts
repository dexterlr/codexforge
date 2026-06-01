import type { VideoArtifactGallerySummary } from "./local-video-artifact-types";
import { buildVideoArtifactHandoff } from "./video-artifact-handoff";
import { buildVideoArtifactMetadata } from "./video-artifact-metadata";
import { buildVideoArtifactPreview } from "./video-artifact-preview";
import { buildDefaultVideoArtifactRecords } from "./video-artifact-record";
import { buildVideoArtifactReviewState } from "./video-artifact-review-state";

export function buildVideoArtifactGallerySummary(): VideoArtifactGallerySummary {
  const records = buildDefaultVideoArtifactRecords();
  const previews = records.map((record) =>
    buildVideoArtifactPreview({
      id: `video-artifact-preview-${record.id}`,
      artifactId: record.id,
      placeholder: `${record.kind} preview will appear after future approved output.`,
    })
  );
  const metadata = records.map((record) =>
    buildVideoArtifactMetadata({
      id: `video-artifact-metadata-${record.id}`,
      artifactId: record.id,
      details: [record.kind, record.source, "local review planned"],
    })
  );
  const reviewStates = records.map((record) =>
    buildVideoArtifactReviewState({
      id: `video-artifact-review-${record.id}`,
      artifactId: record.id,
    })
  );
  const handoff = buildVideoArtifactHandoff();

  return {
    records,
    previews,
    metadata,
    reviewStates,
    handoff,
    summary: summarizeVideoArtifactGallery({ records, previews, metadata, reviewStates, handoff, summary: "" }),
  };
}

export function summarizeVideoArtifactGallery(summary: VideoArtifactGallerySummary): string {
  return `${summary.records.length} future artifact kinds are modeled with previews, metadata, review states, and no file browsing.`;
}
