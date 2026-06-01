"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { WorkflowParameterSafety } from "../workflow-parameter-types";

export function WorkflowParameterSafetyPanel({ safety }: { safety: WorkflowParameterSafety[] }) {
  return (
    <PreviewFoundationCard title="Edit safety">
      <PreviewFoundationCopy>Every setting gets a safety label before it can be included in a future job package.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={safety.map((item) => `${item.level}: ${item.explanation}`)} />
    </PreviewFoundationCard>
  );
}
