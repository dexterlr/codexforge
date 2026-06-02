"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { DualGpuProfile } from "../dual-gpu-worker-types";

export function DualGpuProfilePanel({ profile }: { profile: DualGpuProfile }) {
  return (
    <PreviewFoundationCard title="Workstation profile">
      <PreviewFoundationCopy>{profile.workstation}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[profile.gpuLabel, `${profile.gpuCount} GPUs`, profile.memoryGuidance]} />
      <PreviewFoundationCopy>Manual profile only: no hardware command is run.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
