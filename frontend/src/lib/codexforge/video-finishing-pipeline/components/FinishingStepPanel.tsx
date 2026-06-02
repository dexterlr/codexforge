"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { FinishingStep } from "../video-finishing-types";

export function FinishingStepPanel({ steps }: { steps: FinishingStep[] }) {
  return (
    <PreviewFoundationCard title="Finishing steps">
      <PreviewFoundationCopy>Follow the steps after the best draft is selected.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={steps.map((step) => `${step.label}: ${step.plainEnglish}`)} />
    </PreviewFoundationCard>
  );
}
