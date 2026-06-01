import type { LocalVideoWorkflowRequirement } from "./local-video-workflow-types";

export function buildLocalVideoWorkflowRequirement(input: LocalVideoWorkflowRequirement): LocalVideoWorkflowRequirement {
  return { ...input };
}
