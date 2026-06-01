import type { LocalVideoWorkflowStep } from "./local-video-workflow-types";

export function buildLocalVideoWorkflowStep(input: LocalVideoWorkflowStep): LocalVideoWorkflowStep {
  return { ...input };
}
