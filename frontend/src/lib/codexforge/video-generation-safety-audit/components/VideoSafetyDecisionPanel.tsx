"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoSafetyDecision } from "../video-generation-safety-types";

export function VideoSafetyDecisionPanel({ decision }: { decision: VideoSafetyDecision }) {
  return (
    <PreviewFoundationCard title="Safety decision">
      <PreviewFoundationCopy>{decision.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[decision.status, ...decision.blockers]} />
      <PreviewFoundationCopy>{decision.nextStep}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
