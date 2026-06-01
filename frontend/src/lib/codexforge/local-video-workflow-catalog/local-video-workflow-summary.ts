import type { LocalVideoWorkflow, LocalVideoWorkflowSummary } from "./local-video-workflow-types";
import { buildDefaultLocalVideoWorkflows } from "./local-video-workflow";

export function summarizeLocalVideoWorkflows(workflows: readonly LocalVideoWorkflow[]): string {
  return `${workflows.length} video workflows, local-draft-first, preview-only, no video generated.`;
}

export function buildLocalVideoWorkflowSummary(workflows = buildDefaultLocalVideoWorkflows()): LocalVideoWorkflowSummary {
  return {
    workflows,
    workflowCount: workflows.length,
    localDraftCount: workflows.filter((workflow) => workflow.routing.localFirstReason.includes("Local drafts")).length,
    summary: summarizeLocalVideoWorkflows(workflows),
    nextAction: "Choose a workflow, then review a video job preview before anything renders.",
  };
}
