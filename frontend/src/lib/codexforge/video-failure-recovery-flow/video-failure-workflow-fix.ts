import type { VideoFailureWorkflowFix } from "./video-failure-recovery-types";

export function buildVideoFailureWorkflowFix(input: Partial<VideoFailureWorkflowFix> = {}): VideoFailureWorkflowFix {
  return {
    id: input.id ?? "video-failure-workflow-fix",
    label: input.label ?? "Workflow fix guidance",
    plainEnglish: input.plainEnglish ?? "Review nodes, model names, output path, resolution, and duration before changing workflow JSON.",
    workflowMutationAllowed: false,
  };
}
