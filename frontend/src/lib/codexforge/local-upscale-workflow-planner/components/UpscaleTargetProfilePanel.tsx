"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { UpscaleTargetProfile } from "../local-upscale-workflow-types";

export function UpscaleTargetProfilePanel({ targetProfile }: { targetProfile: UpscaleTargetProfile }) {
  return (
    <PreviewFoundationCard title="Target profile">
      <PreviewFoundationCopy>{targetProfile.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[targetProfile.targetResolution, `Quality target: ${targetProfile.qualityTarget}`]} />
    </PreviewFoundationCard>
  );
}
