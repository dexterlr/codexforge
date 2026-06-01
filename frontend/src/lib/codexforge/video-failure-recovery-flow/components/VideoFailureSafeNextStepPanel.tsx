"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoFailureSafeNextStep } from "../video-failure-recovery-types";

export function VideoFailureSafeNextStepPanel({ steps }: { steps: VideoFailureSafeNextStep[] }) {
  return (
    <PreviewFoundationCard title="Safe next step">
      <PreviewFoundationCopy>Each next step is manual and reviewable. Nothing retries by itself.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={steps.map((step) => `${step.label}: ${step.plainEnglish}`)} />
    </PreviewFoundationCard>
  );
}
