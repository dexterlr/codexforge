"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoDraftHandoff } from "../local-video-draft-types";

export function VideoDraftHandoffPanel({ handoff }: { handoff: VideoDraftHandoff }) {
  return (
    <PreviewFoundationCard title="Draft handoff">
      <PreviewFoundationCopy>{handoff.nextStep}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[handoff.copyLabel, handoff.requestHandoff, handoff.resultHandoff]} />
    </PreviewFoundationCard>
  );
}
