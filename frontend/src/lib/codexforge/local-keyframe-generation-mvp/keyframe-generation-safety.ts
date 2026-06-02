import type {
  KeyframeGenerationRequest,
  KeyframeGenerationSafety,
} from "./local-keyframe-generation-types";

export function buildKeyframeGenerationSafety(
  request: KeyframeGenerationRequest
): KeyframeGenerationSafety {
  return {
    id: `${request.id}-safety`,
    localOnly: true,
    stillFramesOnly: true,
    noCloudSpend: true,
    noComfyUiCall: true,
    noAutoRun: true,
    noSecrets: true,
    approvalRequired: true,
    plainEnglish:
      "This MVP prepares keyframe image requests only. It does not call ComfyUI, submit a queue item, render video, or send prompts to cloud providers.",
  };
}
