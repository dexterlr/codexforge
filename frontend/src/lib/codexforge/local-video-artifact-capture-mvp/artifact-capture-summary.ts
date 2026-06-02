import type { ArtifactCaptureSummary } from "./local-video-artifact-capture-types";
import { buildArtifactCaptureHandoff } from "./artifact-capture-handoff";
import { buildDefaultArtifactCaptureInput } from "./artifact-capture-input";
import { buildArtifactCaptureRecord } from "./artifact-capture-record";
import { buildArtifactCaptureReview } from "./artifact-capture-review";
import { buildArtifactCaptureSafety } from "./artifact-capture-safety";

export function buildArtifactCaptureSummary(): ArtifactCaptureSummary {
  const input = buildDefaultArtifactCaptureInput();
  const record = buildArtifactCaptureRecord(input);
  const review = buildArtifactCaptureReview(input, record);
  const safety = buildArtifactCaptureSafety(input);
  const handoff = buildArtifactCaptureHandoff(record, review);

  return {
    input,
    record,
    review,
    safety,
    handoff,
    summary: summarizeArtifactCapture({ input, record, review, safety, handoff, summary: "" }),
  };
}

export function summarizeArtifactCapture(summary: ArtifactCaptureSummary): string {
  return `Artifact capture MVP is ${summary.review.status}: supplied metadata is marked for review, no file mutation occurs, and no fake artifact is created.`;
}
