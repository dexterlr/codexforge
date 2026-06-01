"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoArtifactReviewState } from "../local-video-artifact-types";

export function VideoArtifactReviewStatePanel({ states }: { states: VideoArtifactReviewState[] }) {
  return (
    <PreviewFoundationCard title="Review state">
      <PreviewFoundationCopy>Artifacts will move into review, retry, compare, or final-candidate decisions later.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={states.map((state) => `${state.status}: ${state.nextStep}`)} />
    </PreviewFoundationCard>
  );
}
