"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ArtifactCaptureRecord } from "../local-video-artifact-capture-types";

export function ArtifactCaptureRecordPanel({ record }: { record: ArtifactCaptureRecord }) {
  return (
    <PreviewFoundationCard title="Artifact record">
      <PreviewFoundationCopy>No fake artifact is created. The record uses supplied metadata and keeps provenance visible.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[record.artifactKind, record.label, record.provenance, ...record.suppliedMetadata]} />
    </PreviewFoundationCard>
  );
}
