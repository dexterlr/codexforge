"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ArtifactCaptureHandoff } from "../local-video-artifact-capture-types";

export function ArtifactCaptureHandoffPanel({ handoff }: { handoff: ArtifactCaptureHandoff }) {
  return (
    <PreviewFoundationCard title="Artifact handoff">
      <PreviewFoundationCopy>{handoff.nextStep}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[handoff.copyLabel, handoff.artifactHandoff, handoff.reviewHandoff]} />
    </PreviewFoundationCard>
  );
}
