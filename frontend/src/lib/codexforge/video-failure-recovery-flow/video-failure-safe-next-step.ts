import type { VideoFailureSafeNextStep } from "./video-failure-recovery-types";

export function buildVideoFailureSafeNextStep(input: Partial<VideoFailureSafeNextStep> = {}): VideoFailureSafeNextStep {
  return {
    id: input.id ?? "video-failure-next-step-review-assets",
    label: input.label ?? "Review assets",
    plainEnglish: input.plainEnglish ?? "Check missing models, nodes, and paths before planning a retry.",
    automaticRetryAllowed: false,
  };
}
