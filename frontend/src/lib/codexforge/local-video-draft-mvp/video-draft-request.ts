import type { VideoDraftRequest } from "./local-video-draft-types";

export function buildVideoDraftRequest(input: Partial<VideoDraftRequest> = {}): VideoDraftRequest {
  return {
    id: input.id ?? "local-video-draft-request-001",
    prompt: input.prompt ?? "Short local video draft showing the planned concept in three clear beats.",
    storyboard: input.storyboard ?? "Three-shot storyboard: establish, action, close.",
    keyframes: input.keyframes ?? ["opening keyframe supplied later", "middle keyframe supplied later", "closing keyframe supplied later"],
    workflowPackage: input.workflowPackage ?? "reviewed-local-video-draft-workflow-package",
    targetDuration: input.targetDuration ?? "4 seconds draft target",
    targetResolution: input.targetResolution ?? "720p draft target",
    localProvider: input.localProvider ?? "ComfyUI local provider, not called from this page",
    artifactDestination: input.artifactDestination ?? "safe local video draft artifact workspace, supplied later",
    renderQueuePosture: input.renderQueuePosture ?? "preview-only queue posture, no mutation",
    dryRunReviewed: input.dryRunReviewed ?? true,
    submitBoundaryReviewed: input.submitBoundaryReviewed ?? true,
    approvalStatus: input.approvalStatus ?? "request-reviewed",
    executionPosture: input.executionPosture ?? "blocked-until-approved-executor",
    noAutoRunGuarantee: true,
  };
}

export function buildDefaultVideoDraftRequest(): VideoDraftRequest {
  return buildVideoDraftRequest();
}
