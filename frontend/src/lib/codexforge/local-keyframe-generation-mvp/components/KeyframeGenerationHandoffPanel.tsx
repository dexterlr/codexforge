"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { KeyframeGenerationHandoff } from "../local-keyframe-generation-types";

export function KeyframeGenerationHandoffPanel({ handoff }: { handoff: KeyframeGenerationHandoff }) {
  return (
    <PreviewFoundationCard title="Keyframe handoff">
      <PreviewFoundationCopy>{handoff.nextStep}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[handoff.copyLabel, handoff.requestHandoff, handoff.resultHandoff]} />
    </PreviewFoundationCard>
  );
}
