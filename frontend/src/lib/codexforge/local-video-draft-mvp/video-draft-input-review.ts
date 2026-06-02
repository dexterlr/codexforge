import type { VideoDraftInputReview, VideoDraftRequest } from "./local-video-draft-types";

export function buildVideoDraftInputReview(request: VideoDraftRequest): VideoDraftInputReview {
  return {
    id: `${request.id}-input-review`,
    promptReady: request.prompt.trim().length > 0,
    storyboardReady: request.storyboard.trim().length > 0,
    keyframesReady: request.keyframes.length > 0,
    workflowReady: request.workflowPackage.trim().length > 0,
    plainEnglish:
      "A local draft video request needs a prompt, storyboard, keyframes, workflow package, artifact destination, queue posture, dry-run review, and submit-boundary review.",
  };
}
