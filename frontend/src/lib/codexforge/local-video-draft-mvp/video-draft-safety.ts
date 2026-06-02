import type { VideoDraftRequest, VideoDraftSafety } from "./local-video-draft-types";

export function buildVideoDraftSafety(request: VideoDraftRequest): VideoDraftSafety {
  return {
    id: `${request.id}-safety`,
    localOnly: true,
    draftOnly: true,
    finalLater: true,
    noCloudSpend: true,
    noComfyUiCall: true,
    noQueueMutation: true,
    noAutoRun: true,
    approvalRequired: true,
    plainEnglish:
      "This MVP prepares a short local video draft request only. It does not render video, mutate a queue, call ComfyUI, upscale, interpolate frames, or send prompts to providers.",
  };
}
