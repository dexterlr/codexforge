"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { WorkflowParameterPreset } from "../workflow-parameter-types";

export function WorkflowParameterPresetPanel({ preset }: { preset: WorkflowParameterPreset }) {
  return (
    <PreviewFoundationCard title="Beginner preset">
      <PreviewFoundationCopy>{preset.label}: {preset.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={preset.lockedValues} />
    </PreviewFoundationCard>
  );
}
