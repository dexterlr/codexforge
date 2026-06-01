"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { WorkflowParameter } from "../workflow-parameter-types";

export function WorkflowParameterPanel({ parameters }: { parameters: WorkflowParameter[] }) {
  return (
    <PreviewFoundationCard title="Editable parameters">
      <PreviewFoundationCopy>Technical values become labels a beginner can understand before any workflow is changed.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={parameters.map((parameter) => `${parameter.label}: ${parameter.safetyLevel}`)} />
    </PreviewFoundationCard>
  );
}
