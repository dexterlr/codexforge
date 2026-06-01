import type { WorkflowParameterSummary } from "./workflow-parameter-types";
import { buildWorkflowParameterHandoff } from "./workflow-parameter-handoff";
import { buildWorkflowParameterMapping } from "./workflow-parameter-mapping";

export function buildWorkflowParameterSummary(): WorkflowParameterSummary {
  const mapping = buildWorkflowParameterMapping();
  const handoff = buildWorkflowParameterHandoff();

  return {
    mapping,
    handoff,
    summary: summarizeWorkflowParameterMapping({ mapping, handoff, summary: "" }),
  };
}

export function summarizeWorkflowParameterMapping(summary: WorkflowParameterSummary): string {
  return `${summary.mapping.parameters.length} parameters mapped into ${summary.mapping.groups.length} plain-English groups with workflow mutation blocked.`;
}
