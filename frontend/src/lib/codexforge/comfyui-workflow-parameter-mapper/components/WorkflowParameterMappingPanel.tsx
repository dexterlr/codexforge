"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { WorkflowParameterMapping } from "../workflow-parameter-types";

export function WorkflowParameterMappingPanel({ mapping }: { mapping: WorkflowParameterMapping }) {
  return (
    <PreviewFoundationCard title="Mapping result">
      <PreviewFoundationCopy>The workflow is not mutated. The result is a reviewable parameter plan for packaging later.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={["Workflow mutation blocked", `${mapping.parameters.length} values mapped`, `${mapping.groups.length} groups explained`]} />
    </PreviewFoundationCard>
  );
}
