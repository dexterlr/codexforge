"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { InterpolationTargetProfile } from "../frame-interpolation-types";

export function InterpolationTargetProfilePanel({ targetProfile }: { targetProfile: InterpolationTargetProfile }) {
  return (
    <PreviewFoundationCard title="FPS target">
      <PreviewFoundationCopy>{targetProfile.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={[targetProfile.targetFps, `Smoothness: ${targetProfile.smoothnessTarget}`, targetProfile.outputDuration]}
      />
    </PreviewFoundationCard>
  );
}
