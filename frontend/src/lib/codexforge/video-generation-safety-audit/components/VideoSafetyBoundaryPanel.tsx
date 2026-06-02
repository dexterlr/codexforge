"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoSafetyBoundary } from "../video-generation-safety-types";

export function VideoSafetyBoundaryPanel({ boundaries }: { boundaries: VideoSafetyBoundary[] }) {
  return (
    <PreviewFoundationCard title="Safety boundaries">
      <PreviewFoundationCopy>Boundaries keep the audit separate from real generation.</PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={boundaries.map((boundary) => `${boundary.enforced ? "enforced" : "needs review"}: ${boundary.label}`)}
      />
    </PreviewFoundationCard>
  );
}
