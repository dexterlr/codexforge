"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ArtifactCaptureSafety } from "../local-video-artifact-capture-types";

export function ArtifactCaptureSafetyPanel({ safety }: { safety: ArtifactCaptureSafety }) {
  return (
    <PreviewFoundationCard title="Capture safety">
      <PreviewFoundationCopy>{safety.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={["no arbitrary filesystem browsing", "no deletion", "no mutation", "no fake artifact", "supplied metadata clearly marked", "safe artifact workspace only"]} />
    </PreviewFoundationCard>
  );
}
