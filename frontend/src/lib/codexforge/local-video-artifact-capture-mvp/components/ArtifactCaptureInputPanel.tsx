"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ArtifactCaptureInput } from "../local-video-artifact-capture-types";

export function ArtifactCaptureInputPanel({ input }: { input: ArtifactCaptureInput }) {
  return (
    <PreviewFoundationCard title="Capture input">
      <PreviewFoundationCopy>Record a local image, keyframe, or video draft for review. This is supplied metadata, not a file operation.</PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={[
          `artifact kind: ${input.artifactKind}`,
          `source request id: ${input.sourceRequestId}`,
          `source workflow package id: ${input.sourceWorkflowPackageId}`,
          `source provider: ${input.sourceProvider}`,
          `file label: ${input.fileLabel}`,
          `safe relative artifact path optional: ${input.safeRelativeArtifactPath ?? "not supplied"}`,
          `thumbnail supplied optional: ${input.thumbnailSupplied ?? "not supplied"}`,
          `duration supplied optional: ${input.durationSupplied ?? "not supplied"}`,
          `resolution supplied optional: ${input.resolutionSupplied ?? "not supplied"}`,
          `status: ${input.status}`,
          `review notes: ${input.reviewNotes}`,
          "no-file-mutation guarantee",
        ]}
      />
    </PreviewFoundationCard>
  );
}
